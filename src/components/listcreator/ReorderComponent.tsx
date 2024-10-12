/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck
import React from "react";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable } from "../listcreator/StricModeDroppable"; // Ensure this is correctly imported

interface Item {
  id: string;
  treslag: string;
  klGrense: string;
  klasse: string;
  postNr: string;
  antall: number;
  m3: number;
  status: string;
  post: string;
  bredde: string;
  xLog: string;
  prosent: string;
  anm: string;
  vs66: string;
  vs66Br: string;
  mkvBord: string;
  mkvBordBr: string;
  blad: number;
  progress: string;
}

interface ReorderComponentProps {
  localList: Item[];
  setLocalList: React.Dispatch<React.SetStateAction<Item[]>>;
}

const ReorderComponent: React.FC<ReorderComponentProps> = ({
  localList,
  setLocalList,
}) => {
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const newItems = Array.from(localList);
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);

    setLocalList(newItems);
    await updateItemsInNewOrder(newItems);
  };

  const updateItemsInNewOrder = async (updatedItems) => {
    try {
      await Promise.all(
        updatedItems.map((item, index) =>
          updateOrder.mutateAsync({
            id: item.id,
            newIndex: index,
          }),
        ),
      );
    } catch (error) {
      console.error("Error updating item order in the database", error);
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="droppable">
          {(provided) => (
            <table
              className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <thead>
                <tr className="border border-l-base-100 border-r-base-100 border-t-base-100 bg-neutral text-left">
                  <th className="text-sm text-primary">Treslag</th>
                  <th className="text-sm text-primary">Klassegrense</th>
                  <th className="text-sm text-primary">Kl</th>
                  <th className="text-sm text-primary">PostNr.</th>
                  <th className="text-sm text-primary">Antall</th>
                  <th className="text-sm text-primary">M3</th>
                  <th className="text-sm text-primary">Status</th>
                  <th className="text-sm text-primary">Uttak</th>
                  <th className="text-sm text-primary">X-log</th>
                  <th className="text-sm text-primary">%</th>
                  <th className="text-sm text-primary">Anm</th>
                  <th className="text-sm text-primary">VS66</th>
                  <th className="text-sm text-primary">Bredde VS66</th>
                  <th className="text-sm text-primary">MKV</th>
                  <th className="text-sm text-primary">Bredde MKV</th>
                  <th className="text-sm text-primary">Blad</th>
                </tr>
              </thead>
              <tbody>
                {localList?.map((item, index) => {
                  const getProgressClass = (progress) => {
                    switch (progress) {
                      case "aktiv":
                        return "bg-accent";
                      case "fullført":
                        return "bg-neutral";
                      case "":
                        return "bg-base-100";
                      default:
                        return ""; // Added default case for safety
                    }
                  };

                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`border border-gray-700 border-l-transparent border-r-transparent py-2 hover:cursor-pointer hover:bg-neutral ${getProgressClass(item.progress)} ${snapshot.isDragging ? "" : ""}`} // Change background color when dragging
                        >
                          <td
                            className={`py-6 font-bold ${item.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                          >
                            {item.treslag}
                            <div className="text-xs font-normal italic text-primary"></div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.klGrense}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.klasse}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.postNr}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.antall}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.m3}
                            </div>
                          </td>
                          <td className="py-6">
                            <div
                              className={`text-xs text-primary ${item.status === "stopp" ? "text-red-500" : "text-green-500"}`}
                            >
                              {item.status}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs font-bold text-primary">
                              {item.post}x{item.bredde}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.xLog}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.prosent}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-blue-500">
                              {item.anm}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.vs66}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.vs66Br}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.mkvBord}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.mkvBordBr}
                            </div>
                          </td>
                          <td className="py-6">
                            <div className="text-xs text-primary">
                              {item.blad.toFixed(1)}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </tbody>
            </table>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default ReorderComponent;
