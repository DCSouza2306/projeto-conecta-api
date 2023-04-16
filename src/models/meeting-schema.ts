import Joi from "joi";
import { CreateMeetingParams } from "../services/meeting-service";

export const meetingSchema = Joi.object <CreateMeetingParams>({
    date: Joi.string().required(),
    hour: Joi.string().required(),
    description: Joi.string().required(),
    url: Joi.string().required()
})