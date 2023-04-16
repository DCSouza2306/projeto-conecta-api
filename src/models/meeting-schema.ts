import Joi from "joi";
import { CreateMeetingBodyParams } from "../services/meeting-service";

export const meetingSchema = Joi.object <CreateMeetingBodyParams>({
    date: Joi.string().required(),
    hour: Joi.string().required(),
    description: Joi.string().required(),
    url: Joi.string().required(),
    mediator: Joi.number().required()
})