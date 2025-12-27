import {protectedProcedure, publicProcedure, router} from "../trpc";
import {z} from "zod";
import {Employee} from "../../models/Employee.model";
import {AppError} from "../../errors/AppError";
import {ErrorCode} from "../../errors/errorCodes";

export const employeeRouter = router({
  createNewEmployee: protectedProcedure
    .input(z.object({
      userName: z.string().min(1, "User name is required!"),
      password: z.string().min(1, "Password is required!"),
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
        throw new AppError(
          "Failed to create new employee!",
          500,
          ErrorCode.DATABASE_ERROR,
        )
      }

    }),

  getAllEmployee: protectedProcedure.query(async ({ctx}) => {
    const {userId, company} = ctx;

    if (!userId || !company) {
      throw new Error("Unauthorized");
    }
    try {
      const allEmployee = await Employee.find({companyId: company._id, isActive: true});
      return allEmployee;
    } catch (e) {
      throw new AppError(
        "Failed load all employees!",
        500,
        ErrorCode.DATABASE_ERROR,
      )
    }
  }),

  getCurrentEmployee: publicProcedure
    .input(z.object(
      {
        userName: z.string().min(1, "User name is required!"),
        password: z.string().min(1, "Password is required!")
      }
    ))
    .query(async ({input}) => {
      try {
        const employeeAccount = await Employee.findOne({
          userName: input.userName,
          password: input.password
        });

        return employeeAccount;
      } catch (e) {
        throw new AppError(
          "Failed to load current employee!",
          500,
          ErrorCode.DATABASE_ERROR,
        )
      }
    }),

  updateEmployeeById: protectedProcedure.input(
    z.object({
      employeeId: z.string(),
      userName: z.string().optional(),
      password: z.string().optional(),
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      position: z.string().optional(),
    })
  ).mutation(async ({ctx, input}) => {
    const {userId, company} = ctx;

    if (!userId || !company) {
      throw new Error("Unauthorized");
    }
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate({
          _id: input.employeeId,
          companyId: company._id
        }, {
          ...input
        },
        {new: true}
      );

      return updatedEmployee;
    } catch (e) {
      throw new AppError(
        "Failed to update the employee!",
        500,
        ErrorCode.DATABASE_ERROR,
      )
    }
  }),

  deactivateEmployeeById: protectedProcedure
    .input(
      z.object({
        employeeId: z.string()
      })
    )
    .mutation(async ({ctx, input}) => {
      const {userId, company} = ctx;

      if (!userId || !company) {
        throw new Error("Unauthorized");
      }
      try {
        const deactivatedEmployee = await Employee.findByIdAndUpdate(
          {
            _id: input.employeeId,
            companyId: company._id,
          },
          {isActive: false},
          {new: true}
        );

        return deactivatedEmployee;
      } catch (e) {
        throw new AppError(
          "Failed to deactivate the employee!",
          500,
          ErrorCode.DATABASE_ERROR,
        )
      }

    })
})