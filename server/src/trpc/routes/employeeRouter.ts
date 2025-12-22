import {router, publicProcedure, protectedProcedure} from "../trpc";
import {z} from "zod";
import {Employee} from "../../models/Employee.model";

export const employeeRouter = router({
  createNewEmployee: publicProcedure
    .input(z.object({
      firstName: z.string().min(1, "First name is required!"),
      lastName: z.string().min(1, "Last name is required!"),
      position: z.string().min(1, "Position is required!")
    }))
    .mutation(async ({ctx, input}) => {
      const {userId, company} = ctx;

      if (!userId || !company) {
        throw new Error("Unauthorized");
      }
      try {
        const employee = await Employee.create({
          companyId: company._id,
          ...input
        });

        return employee;

      } catch (e) {
        console.error(e);
        console.log("Failed to create new employee!");
        throw new Error("Failed to create new employee!");
      }

    }),

  getAllEmployee: publicProcedure.query(async ({ctx})=>{
    const {userId, company} = ctx;

    if(!userId || !company){
      throw new Error("Unauthorized");
    }
    try {
      const allEmployee = await Employee.find({companyId:company._id, isActive: true});
      return allEmployee;
    } catch (e) {
      console.error(e);
      console.log("Server error, can't load data!");
      throw new Error("Internal server error!");
    }
  })
})