import React from 'react';
import { Task } from '../types/Task';

interface Props {
  task: Task;
  onDelete: () => void;
  onAdvanceStatus: () => void;
}

const TaskItem: React.FC<Props> = ({ task, onDelete, onAdvanceStatus }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border shadow-sm">
      <h3 className="font-semibold text-gray-800 text-base">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={onAdvanceStatus}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Suivant
        </button>
        <button
          onClick={onDelete}
          className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
