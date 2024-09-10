import { RemoteCreateChecklist } from "@/data/usecases/create-checklist";
import { RemoteDeleteChecklist } from "@/data/usecases/delete-checklist";
import { RemoteUpdateChecklist } from "@/data/usecases/update-checklist";
import { Checklist } from "@/domain/entities/checklist.entity";
import { CreateChecklist as CreateChecklistDomain } from "@/domain/usecases/create-checklist";
import { DeleteOfflineAction } from "@/infra/db/usecases/delete-offline-action";
import { GetChecklists } from "@/infra/db/usecases/get-checklists";
import { GetOfflineActions } from "@/infra/db/usecases/get-offline-actions";
import { AxiosHttpClient } from "@/infra/http/axios-http-client";
import NetInfo from "@react-native-community/netinfo";
import React, { useEffect, useState } from "react";
import { ChecklistContext } from "../context/checklist-context";

export const ChecklistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const axiosInstance = new AxiosHttpClient();
  const [checklists, setChecklists] = useState<Checklist[]>([]);

  useEffect(() => {
    const loadChecklists = async () => {
      const storedChecklists = await GetChecklists.getAll();
      setChecklists(
        storedChecklists.map((checklist) => ({
          ...checklist,
          _id: String(checklist._id),
        }))
      );
    };

    loadChecklists();

    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        processQueue();
      }
    });
  }, [NetInfo]);

  const processQueue = async () => {
    const actions = await GetOfflineActions.getAll();
    const remoteCreateChecklist = new RemoteCreateChecklist(
      "/checkList",
      axiosInstance
    );

    const remoteUpdateChecklist = new RemoteUpdateChecklist(
      "/checkList",
      axiosInstance
    );

    const remoteDeleteChecklist = new RemoteDeleteChecklist(
      "/checkList",
      axiosInstance
    );

    if (actions.length > 0) {
      for (const action of actions) {
        try {
          switch (action.type) {
            case "CREATE":
              await remoteCreateChecklist.create(
                action.data.map((checklist) => ({
                  ...checklist,
                  _id: String(checklist._id),
                })) as CreateChecklistDomain.Params[]
              );
              break;
            case "UPDATE":
              for (const checklist of action.data) {
                await remoteUpdateChecklist.update({
                  data: {
                    ...checklist,
                    _id: String(checklist._id),
                  },
                });
              }
              break;
            case "DELETE":
              await remoteDeleteChecklist.delete({
                _id: String(action.checklistId),
              });
              break;
          }

          await DeleteOfflineAction.delete(action._id.toHexString());
        } catch (error) {
          throw error;
        }
      }
    }
  };

  const syncChecklists = async () => {
    await processQueue();
  };

  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        syncChecklists,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
};
