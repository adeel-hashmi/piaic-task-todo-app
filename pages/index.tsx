import Head from 'next/head'
import React, { useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';


export default function Home() {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      setTodos(
        todos.map((todo, index) => {
          if (index === editingIndex) {
            return newTodo;
          }
          return todo;
        })
      );
      setEditingIndex(null);
    } else {
      setTodos([...todos, newTodo]);
    }
    setNewTodo('');
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setNewTodo(todos[index]);
  };

  const handleDelete = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="container mx-auto w-[500px] rounded-lg border-2 border-blue-400 p-6">
        <Head>
          <title>Assignment: To-Do App -- ID: PIAIC57799</title>
          <link rel="stylesheet" href="/_next/static/css/styles.css" />
        </Head>
        <h1 className="  text-blue-400 text-center text-2xl font-medium mb-8">Todo App</h1>
        <form onSubmit={handleSubmit} className="mx-auto flex items-center mb-8">
          <input
            type="text"
            className="p-2 rounded-lg w-full border-2 outline-blue-400 text-zinc-600"
            placeholder="Add new task"
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
          />
          <button type="submit" disabled={newTodo === '' ? true : false} className={`bg-blue-300 hover:accent-inherit  hover:border-blue-400 focus:border-blue-400 border-blue-400 border p-2 rounded-lg w-ful ml-2 text-white`}>
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </form>
        <ul className='overflow-auto max-h-96 snap-center' >
          {todos.map((todo, index) => (
            <>
              <li
                key={index}
                className="p-2 rounded-lg  flex justify-between items-center"
              >
                <>
                  {index + 1}. {todo}
                </>
                <div>

                  <button
                    className="bg-blue-500 p-1 rounded-lg mr-2"
                    onClick={() => handleEdit(index)}
                  >
                    <AiOutlineEdit className='text-white' />
                  </button>
                  <button
                    className="bg-red-500 p-1 rounded-lg"
                    onClick={() => handleDelete(index)}
                  >
                    <AiOutlineDelete className='text-white' />
                  </button>
                </div>
              </li>
              <hr />
            </>
          ))}
        </ul>
      </div>
      <p className="bottom-0 text-center text-lg text-slate-400">Developed by: Adeel Hashmi - ID: PIAIC57799</p>
    </>
  )
}
