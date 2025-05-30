import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const TaskSchema = z.object({
  title: z.string().min(1, 'Titre requis'),
  description: z.string().min(1, 'Description requise'),
});

type TaskFormInput = z.infer<typeof TaskSchema>;

interface Props {
  onSubmit: (title: string, description: string) => void;
  onCancel: () => void;
}

const AddTaskForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormInput>({
    resolver: zodResolver(TaskSchema),
  });

  const submitHandler = (data: TaskFormInput) => {
    onSubmit(data.title, data.description);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-2 mb-4">
      <input
        {...register("title")}
        placeholder="Titre"
        className="w-full border p-2 rounded"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <textarea
        {...register("description")}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="text-sm px-3 py-1 bg-gray-300 rounded">
          Annuler
        </button>
        <button type="submit" className="text-sm bg-blue-500 text-white px-3 py-1 rounded">
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
export {};
