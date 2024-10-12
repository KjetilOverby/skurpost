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
            <div
              className="table table-xs w-full whitespace-nowrap border border-b-accent border-l-base-100 border-r-base-100 border-t-accent bg-base-100"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div>
                <div className="flex border border-l-base-100 border-r-base-100 border-t-base-100 bg-neutral text-left">
                  <div className="w-28 text-sm text-primary">Treslag</div>
                  <div className="w-20 text-sm text-primary">Kl</div>
                  <div className="w-20 text-sm text-primary">Antall</div>
                  <div className="w-20 text-sm text-primary">M3</div>
                  <div className="w-20 text-sm text-primary">Status</div>
                  <div className="w-28 text-sm text-primary">Uttak</div>
                  <div className="w-20 text-sm text-primary">X-log</div>
                  <div className="w-20 text-sm text-primary">%</div>
                  <div className="w-20 text-sm text-primary">Anm</div>
                  <div className="w-20 text-sm text-primary">VS66</div>
                  <div className="w-36 text-sm text-primary">Bredde VS66</div>
                  <div className="w-20 text-sm text-primary">MKV</div>
                  <div className="w-36 text-sm text-primary">Bredde MKV</div>
                  <div className="w-20 text-sm text-primary">Blad</div>
                </div>
              </div>
              <div>
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
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`flex border border-gray-700 border-l-transparent border-r-transparent py-2 hover:cursor-pointer hover:bg-neutral ${getProgressClass(item.progress)} ${snapshot.isDragging ? "" : ""}`}
                        >
                          <div
                            className={`w-28 py-6 font-bold ${item.treslag === "Furu" ? "text-orange-500" : "text-green-500"}`}
                          >
                            {item.treslag}
                          </div>

                          <div className="w-20 py-6 text-xs text-primary">
                            {item.klasse}
                          </div>

                          <div className="w-20 py-6 text-xs text-primary">
                            {item.antall}
                          </div>
                          <div className="w-20 py-6 text-xs text-primary">
                            {item.m3}
                          </div>
                          <div
                            className={`w-20 py-6 text-xs text-primary ${item.status === "stopp" ? "text-red-500" : "text-green-500"}`}
                          >
                            {item.status}
                          </div>
                          <div className="w-28 py-6 text-xs font-bold text-primary">
                            {item.post}x{item.bredde}
                          </div>
                          <div className="w-20 py-6 text-xs text-primary">
                            {item.xLog}
                          </div>
                          <div className="w-20 py-6 text-xs text-primary">
                            {item.prosent}
                          </div>
                          <div className="w-20 py-6 text-xs text-blue-500">
                            {item.anm}
                          </div>
                          <div className="w-20 py-6 text-xs text-primary">
                            {item.vs66}
                          </div>
                          <div className="w-36 py-6 text-xs text-primary">
                            {item.vs66Br}
                          </div>
                          <div className="w-20 py-6 text-xs text-primary">
                            {item.mkvBord}
                          </div>
                          <div className="w-36 py-6 text-xs text-primary">
                            {item.mkvBordBr}
                          </div>
                          <div className="w-20 py-6 text-xs text-primary">
                            {item.blad.toFixed(1)}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
};

export default ReorderComponent;
