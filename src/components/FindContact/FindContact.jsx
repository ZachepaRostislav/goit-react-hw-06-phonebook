import React from 'react';
import { Wrapper, Label, Input } from './FindContact.styled';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { setFilter } from 'redux/filterSlice';
import { getFilter } from 'redux/selectors';

export default function FindContact() {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);
  const searchInput = nanoid();

  const onChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <Wrapper>
      <Label htmlFor={searchInput}>Find contacts by name</Label>
      <Input
        type="text"
        id={searchInput}
        value={filter}
        onChange={onChange}
      />
    </Wrapper>
  );
}

