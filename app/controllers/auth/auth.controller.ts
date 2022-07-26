import { Op } from 'sequelize';
import moment from 'moment';

import { UsersModel } from "../../models/Users.model";
import { User } from "../../interfaces/models/models.interface";

import { UserAccountRecovering, UserLogin, UserNewPassword, UserSignUp } from "../../interfaces/controllers/user.interface";

import { ResolveResponse } from "../../interfaces/response.interface";
import { RejectResponse } from "../../interfaces/response.interface";

import Auth from "../../handlers/Auth.handler";

export class AuthController {
    constructor() {}

    private getDate(minutesExtended: number): string {
        return (Date.now() + (minutesExtended * 60000)).toString();
    }

    private getDateFormat(): string {
        return 'YYYY-MM-DD HH:mm:ss';
    }

    public SignUp(user: UserSignUp): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const userFound = await UsersModel.findOne({
                    where: {
                        email: user.email
                    }
                });

                if (userFound && userFound.active) {
                    reject({
                        msg: 'User Found',
                        error: true
                    });
                    return;
                }

                
                if (userFound && !userFound.active && userFound.activationToken) {
                    userFound.tokenExp = this.getDate(5);
                    userFound.activationToken = Auth.GenToken();
                    userFound.password = await Auth.GenHash(user.password);

                    await userFound.save();
                    resolve({
                        msg: `Instructions sent to ${userFound.email}`,
                        data: {
                            token: userFound.activationToken
                        }
                    });
                    return;
                }

                const userCreated = await UsersModel.create(user as User);
                userCreated.tokenExp = this.getDate(5);
                userCreated.activationToken = Auth.GenToken();
                userCreated.password = await Auth.GenHash(user.password);
                
                await userCreated.save();

                resolve({
                    msg: `Instructions sent to ${userCreated.email}`,
                    data: {
                        token: userCreated.activationToken
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during Sign Up',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public Login(user: UserLogin): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const userFound = await UsersModel.findOne({
                    where: {
                        email: user.email
                    }
                });

                if (!userFound) {
                    reject({
                        msg: 'User not found',
                        error: true
                    });
                    return;
                }

                const isValidPassword = await Auth.CompareHash(user.password, userFound.password);

                if (!isValidPassword) {
                    reject({
                        msg: 'Invalid Password',
                        error: true
                    }); 
                    return;
                }

                if (userFound && !userFound.active) {
                    reject({
                        msg: 'User not activated',
                        error: true
                    });
                    return;
                }

                resolve({
                    msg: 'Successful',
                    data: {
                        id_user: userFound.id_user
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during Login',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public RecoverAccount(user: UserAccountRecovering): Promise<ResolveResponse | RejectResponse> {
        return new Promise (async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const userFound = await UsersModel.findOne({
                    where: {
                        email: user.email 
                    }
                });

                if (!userFound) {
                    reject({
                        msg: 'User not found',
                        error: true
                    });
                    return;
                }

                if (userFound && !userFound.active) {
                    reject({
                        msg: 'User not activated',
                        error: true
                    });
                    return;
                }

                userFound.recoveryToken = Auth.GenToken();
                userFound.tokenExp = this.getDate(5);

                await userFound.save();

                resolve({
                    msg: `Intructions sent to ${userFound.email}`,
                    data: {
                        token: userFound.recoveryToken,
                        name: userFound.name
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during account recovery',
                    error: true,
                    errorDetails: error
                });
            }
        });
    }

    public CheckActivationOrRecoveryToken(token: string, tokenType: string): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const userFound = await UsersModel.findOne({
                    where: {
                        [Op.or]: [
                            {
                                activationToken: token
                            },
                            {
                                recoveryToken: token
                            }
                        ]
                    }
                })

                if (!userFound) {
                    reject({
                        msg: 'Token not found',
                        error: true
                    });
                    return;
                }

                const currentTime = moment(Date.now()).format(this.getDateFormat());
                const tokenExpirationTime = moment(Number(userFound.tokenExp)).format(this.getDateFormat());

                userFound.activationToken = null;
                userFound.recoveryToken = null;
                userFound.tokenExp = null;

                if (currentTime > tokenExpirationTime) {
                    await userFound.save();
                    reject({
                        msg: 'Expired token',
                        error: true
                    });
                    return;
                }
                
                if (tokenType === 'activation') {
                    userFound.active = 1;
                }

                await userFound.save();

                resolve({
                    msg: `${tokenType === 'activation' ? 'Account activated' : 'Change the password'}`,
                    data: {
                        id_user: userFound.id_user
                    }
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during account activation',
                    error: true,
                    errorDetails: error
                }); 
            }
        });
    }

    public SetNewPassword(user: UserNewPassword): Promise<ResolveResponse | RejectResponse> {
        return new Promise(async (resolve: (info : ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const userFound = await UsersModel.findOne({
                    where: {
                        id_user: user.id_user
                    }
                });

                if (!userFound) {
                    reject({
                        msg: 'User not found',
                        error : true
                    })
                    return;
                }

                userFound.password = await Auth.GenHash(user.password);

                await userFound.save();

                resolve({
                    msg: 'Account recovered'
                });
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred during password update',
                    error: true,
                    errorDetails: error
                });
            }
        }); 
    }

    public GetUserData(id_user: number): Promise<ResolveResponse | ResolveResponse> {
        return new Promise(async (resolve: (info: ResolveResponse) => void, reject: (reason: RejectResponse) => void) => {
            try {
                const userFound = await UsersModel.findOne({
                    where: {
                        id_user
                    }
                });

                if (!userFound) {
                    reject({
                        msg: "The account doesn't exist or probably has been deleted",
                        error: false
                    });
                    return;
                }
                
                resolve({
                    msg: 'User Found',
                    data: {
                        user: userFound
                    }
                }); 
            } catch (error: any) {
                reject({
                    msg: 'An error has occurred while getting user info',
                    error: true,
                    errorDetails: error
                });
            }   
        });
    }
}