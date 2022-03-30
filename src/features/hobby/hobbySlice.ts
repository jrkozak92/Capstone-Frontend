import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'

export interface Hobby {
  id: number,
  name: string,
  description: string
}

export const getHobbies = createAsyncThunk<any>('hobby/getHobbies', async () => {
  return await axios.get('https://ancient-cliffs-31790.herokuapp.com/hobbies').then((response)=>response.data)
})

export const deleteHobby = createAsyncThunk('hobby/deleteHobby', async (id: number) => {
  return await axios.delete(`https://ancient-cliffs-31790.herokuapp.com/hobbies/${id}`).then((response) => id)
})

export const updateHobby = createAsyncThunk('hobby/updateHobby', async (changedHobby: Hobby) => {
  const updatedHobby = await axios.put(`https://ancient-cliffs-31790.herokuapp.com/hobbies/${changedHobby.id}`, changedHobby).then((response) => response.data[0])
  console.log('Response.data: ', updatedHobby)
  const updateObj: {id: number, changes: Hobby} = {id: updatedHobby.id, changes: { id: updatedHobby.id, name: updatedHobby.name, description: updatedHobby.description }}
  return updateObj
})

export const addHobby = createAsyncThunk('hobby/addHobby', async (newHobby: { name: string, description: string }) => {
  return await axios.post('https://ancient-cliffs-31790.herokuapp.com/hobbies', newHobby)
    .then((response: any)=> response.data[0]
    )
})

export const hobbyAdapter = createEntityAdapter<Hobby>({
  selectId: (hobby) => hobby.id,
})

export const hobbySlice = createSlice({
  name: 'hobby',
  initialState: hobbyAdapter.getInitialState({ status: 'idle' }),
  reducers: {
    hobbyAdded: hobbyAdapter.addOne
  },
  extraReducers: (builder) => {
    builder
    .addCase(getHobbies.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(getHobbies.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      hobbyAdapter.setAll(state, payload)
    })
    .addCase(getHobbies.rejected, (state, action) => {
      state.status = 'failed'
    })
    .addCase(deleteHobby.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(deleteHobby.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      hobbyAdapter.removeOne(state, payload)
    })
    .addCase(updateHobby.pending, (state, action) => {
      state.status = 'loading'
    })
    .addCase(updateHobby.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      console.log(payload);
      hobbyAdapter.updateOne(state, payload)
    })
    .addCase(addHobby.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(addHobby.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      hobbyAdapter.addOne(state, payload)
    })
  }
})

export const hobbySelectors = hobbyAdapter.getSelectors((state: RootState) => state.hobby)

export default hobbySlice.reducer