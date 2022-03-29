import { createSlice, createEntityAdapter, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'

export interface Hobby {
  id: number,
  name: string,
  description: string
}

export const getHobbies = createAsyncThunk<any>('hobby/getHobbies', async (_, { dispatch }) => {
  const data = await axios.get('https://ancient-cliffs-31790.herokuapp.com/hobbies').then((response)=>response.data)
  dispatch(getAllHobbies(data))
})

const hobbyAdapter = createEntityAdapter<any>({
  selectId: (hobby) => hobby.id,
})

export const hobbySlice = createSlice({
  name: 'hobby',
  initialState: hobbyAdapter.getInitialState(),
  reducers: {
    getAllHobbies: hobbyAdapter.setAll,
  }
})

export const hobbySelectors = hobbyAdapter.getSelectors((state: RootState) => state.hobby)

export const { getAllHobbies } = hobbySlice.actions

export default hobbySlice.reducer
