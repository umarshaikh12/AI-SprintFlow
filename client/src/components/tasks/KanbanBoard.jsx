import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";

import {
  getTasksByProject,
  updateTaskStatus,
} from "../../api/taskApi";

function KanbanBoard({
  projectId,
  onTaskChanged,
}) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const response = await getTasksByProject(projectId);
      setTasks(response.data.tasks);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load board");
    }
  };

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    try {
      await updateTaskStatus(
        draggableId,
        destination.droppableId
      );

      fetchTasks();
      if (onTaskChanged) {
            onTaskChanged();
        }

      toast.success("Task moved successfully!");

    } catch (error) {
      console.log(error);
      toast.error("Failed to move task");
    }
  };

  const columns = [
    {
      title: "Todo",
      emoji: "📝",
      color: "border-blue-500",
      status: "Todo",
    },
    {
      title: "In Progress",
      emoji: "🚀",
      color: "border-amber-500",
      status: "In Progress",
    },
    {
      title: "Done",
      emoji: "✅",
      color: "border-emerald-500",
      status: "Done",
    },
  ];

  const priorityColor = (priority) => {
    if (priority === "High") return "bg-red-500";
    if (priority === "Medium") return "bg-amber-500";
    return "bg-emerald-500";
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mt-10">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Sprint Board
            </h2>

            <p className="text-slate-400">
              Organize your sprint tasks
            </p>

          </div>

        </div>

        <div className="grid gap-5 xl:grid-cols-3">

          {columns.map((column) => {

            const columnTasks = tasks.filter(
              (task) => task.status === column.status
            );

            return (

              <Droppable
                key={column.status}
                droppableId={column.status}
              >
                {(provided) => (

                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-2xl border border-slate-800 bg-slate-900"
                  >

                    <div className={`border-b ${column.color} p-4`}>

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2">

                          <span className="text-xl">
                            {column.emoji}
                          </span>

                          <h3 className="font-semibold text-white">
                            {column.title}
                          </h3>

                        </div>

                        <span className="rounded-full bg-slate-800 px-2.5 py-1 text-xs text-slate-300">
                          {columnTasks.length}
                        </span>

                      </div>

                    </div>

                    <div className="max-h-[500px] space-y-3 overflow-y-auto p-4">
                                              {columnTasks.length === 0 ? (

                        <div className="rounded-xl border border-dashed border-slate-700 py-8 text-center text-sm text-slate-500">
                          No tasks
                        </div>

                      ) : (

                        columnTasks.map((task, index) => (

                          <Draggable
                            key={task._id}
                            draggableId={task._id}
                            index={index}
                          >
                            {(provided, snapshot) => (

                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`rounded-xl border border-slate-700 bg-slate-800 p-4 transition-all duration-200 hover:-translate-y-1 hover:border-violet-500 ${
                                  snapshot.isDragging
                                    ? "rotate-1 shadow-2xl border-violet-500"
                                    : ""
                                }`}
                              >

                                <div className="mb-3 flex items-start justify-between">

                                  <h4 className="text-sm font-semibold text-white">
                                    {task.title}
                                  </h4>

                                  <span
                                    className={`rounded-full px-2 py-1 text-[11px] font-medium text-white ${priorityColor(
                                      task.priority
                                    )}`}
                                  >
                                    {task.priority}
                                  </span>

                                </div>

                                {task.description && (

                                  <p className="mb-4 line-clamp-2 text-sm text-slate-400">
                                    {task.description}
                                  </p>

                                )}

                                <div className="flex items-center justify-between text-xs text-slate-500">

                                  <span>
                                    📅{" "}
                                    {task.dueDate
                                      ? new Date(
                                          task.dueDate
                                        ).toLocaleDateString()
                                      : "No due date"}
                                  </span>

                                </div>

                              </div>

                            )}
                          </Draggable>

                        ))

                      )}

                      {provided.placeholder}

                    </div>

                  </div>

                )}
              </Droppable>

            );

          })}

        </div>

      </div>
    </DragDropContext>
  );
}

export default KanbanBoard;