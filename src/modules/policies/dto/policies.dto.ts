import { BaseBodyRequest } from "@src/base/request";
import { Policy } from "../interfaces/policies.interface";

export type CreatePolicyRequestDTO = BaseBodyRequest<Policy>