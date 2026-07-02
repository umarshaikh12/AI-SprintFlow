import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createSprint,
  updateSprint,
} from "../../api/sprintApi";

function SprintModal({
  projectId,
  sprint,
  onClose,
  onSprintCreated,
}) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    if (sprint) {
      setName(sprint.name);
      setGoal(sprint.goal);
      setStartDate(
        sprint.startDate
          ? sprint.startDate.split("T")[0]
          : ""
      );
      setEndDate(
        sprint.endDate
          ? sprint.endDate.split("T")[0]
          : ""
      );
    } else {
      setName("");
      setGoal("");
      setStartDate("");
      setEndDate("");
    }
  }, [sprint]);

  const handleSubmit = async () => {
    try {
      const sprintData = {
        name,
        goal,
        startDate,
        endDate,
      };

      if (sprint) {
        await updateSprint(
          sprint._id,
          sprintData
        );

        toast.success("Sprint updated!");
      } else {
        await createSprint({
          ...sprintData,
          project: projectId,
        });

        toast.success("Sprint created!");
      }

      onSprintCreated();
      onClose();

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

      <div className="w-full max-w-xl rounded-2xl bg-[#1E293B] p-8 border border-slate-700">

        <h2 className="text-2xl font-bold text-white">
          {sprint ? "Edit Sprint" : "Create Sprint"}
        </h2>

        <div className="mt-6">

          <input
            type="text"
            placeholder="Sprint Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white outline-none"
          />

        </div>

        <div className="mt-4">

          <textarea
            rows="4"
            placeholder="Sprint Goal"
            value={goal}
            onChange={(e) =>
              setGoal(e.target.value)
            }
            className="w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white outline-none"
          />

        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">

          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              setStartDate(e.target.value)
            }
            className="rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              setEndDate(e.target.value)
            }
            className="rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 text-white"
          />

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-600 px-5 py-2.5 text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-white hover:bg-violet-500"
          >
            {sprint ? "Update Sprint" : "Create Sprint"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default SprintModal;