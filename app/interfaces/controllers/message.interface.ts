import { Message, Property, User } from "../models/models.interface";

export interface NewMessage extends Message {}

export interface GetMessagesInfo {
    id_property: string
}