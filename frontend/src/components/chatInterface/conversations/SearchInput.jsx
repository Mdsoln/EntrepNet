import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/store';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';

export default function SearchInput() {
  const { selectedConversation,setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;

    if (search.length < 3) {
      toast.error('Search term must be at least 3 characters long');
      return;
    }

    console.log(conversations);
    console.log(search);

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    console.log(conversation);

    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error("User not found");
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search...'
        className='input input-bordered rounded-full'
      />
      <button type='submit' className='btn btn-circle bg-sky-400 text-white'>
        <FaSearch className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
}
