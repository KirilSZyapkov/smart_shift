import { Company } from "../models/Company.model";
import { User } from "../models/User.model";

export async function resolveCompanyByClerkUserId(clerkUserId: string){
    const user = await User.findOne({clerkUserId});

    if(!user){
        return null;
    }

    const company = await Company.findOne({user.companyId});

    if(!company){
        return null;
    }

    return {
        company,
        role: user.role,
        user
    }
}