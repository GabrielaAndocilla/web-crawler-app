import UserInteractionController from "@controllers/UserInteractionController";
import { UserInteraction } from "@domains/entities/UserInteraction";
import UserInteractionMySql from "@repositories/UserInteractionRepository";
import { GetAllInteractions } from "@useCases/GetAllInteractions";
import { Request, Response } from "express";

jest.mock("@useCases/GetAllInteractions");

describe('User Interaction Controller',()=>{
  let req: Partial<Request>;
  let res: Partial<Response>;
  const mock: UserInteraction[] = [{
    id: 1,
    pageNumber: "1",
    titleWords: "5",
    filterType: "lessThan",
  }]

  describe('',()=>{
    it('should return interaction whe everything execute correctly',async () => {

      (GetAllInteractions as jest.Mock).mockImplementation(() => ({
        execute: jest.fn().mockReturnValue(mock)
      })) as unknown as GetAllInteractions;

      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const repo = {} as UserInteractionMySql
      const controller = new UserInteractionController(repo)

      await controller.getInteractions(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200)
      expect(res.json).toHaveBeenCalledWith(mock)
    })
    it('should return message error when it fails',async () => {

      (GetAllInteractions as jest.Mock).mockImplementation(() => ({
        execute: jest.fn().mockRejectedValue(new Error('Database error'))
      })) as unknown as GetAllInteractions;

      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const repo = {} as UserInteractionMySql
      const controller = new UserInteractionController(repo)

      await controller.getInteractions(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({message: "Internal Server Error!"})
    })

  })



})
