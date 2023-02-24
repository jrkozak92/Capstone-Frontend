import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'

export interface Hobby {
  id: number,
  name: string,
  description: string,
  specs: {
      graphPath: string,
      initialInvestment: {
        amount: string,
        equipment: string
      },
      timePerSession: string,
      pickUpAndPlayAbility: string,
  },
  aspectscores: {
      intellectualChallenge: number,
      physicalChallenge: number,
      creativeFocus: number,
      technicalFocus: number,
      financialRequirement: number,
      soloVsGroup: number,
      problemSolvingVsExpression: number,
      desiredTimeInvestment: number,
      technicalBarrierToEntry: number,
  },
  keywords: string[] | string,
  resources: string[] | string
}

export interface IdlessHobby {
  name: string,
  description: string,
  specs: {
      graphPath: string,
      initialInvestment: {
        amount: string,
        equipment: string
      },
      timePerSession: string,
      pickUpAndPlayAbility: string,
  },
  aspectscores: {
      intellectualChallenge: number | "",
      physicalChallenge: number | "",
      creativeFocus: number | "",
      technicalFocus: number | "",
      financialRequirement: number | "",
      soloVsGroup: number | "",
      problemSolvingVsExpression: number | "",
      desiredTimeInvestment: number | "",
      technicalBarrierToEntry: number | "",
  },
  keywords: string,
  resources: string
}

export const getHobbies = createAsyncThunk<any>('hobby/getHobbies', async () => {
  return await axios.get('https://capstone-backend-v0ob.onrender.com/hobbies').then((response)=>response.data)
})

export const deleteHobby = createAsyncThunk('hobby/deleteHobby', async (id: number) => {
  return await axios.delete(`https://capstone-backend-v0ob.onrender.com/hobbies/${id}`).then((response) => id)
})

export const updateHobby = createAsyncThunk('hobby/updateHobby', async (changedHobby: Hobby) => {
  return await axios
    .put(`https://capstone-backend-v0ob.onrender.com/hobbies/${changedHobby.id}`, changedHobby)
    .then((response: any) => {
      const updatedHobby = response.data[0]
      const updateObj: {id: number, changes: Hobby} = {id: changedHobby.id, changes: { id: updatedHobby.id, name: updatedHobby.name, description: updatedHobby.description, specs: updatedHobby.specs, aspectscores: updatedHobby.aspectscores, keywords: updatedHobby.keywords, resources: updatedHobby.resources }}
      return updateObj
  })
})

export const addHobby = createAsyncThunk('hobby/addHobby', async (newHobby: IdlessHobby) => {
  return await axios.post('https://capstone-backend-v0ob.onrender.com/hobbies', newHobby)
    .then((response: any) => response.data[0])
})

export const getHobbyById = createAsyncThunk('hobby/getHobbyById', async (id: number) => {
  return await axios.get(`https://capstone-backend-v0ob.onrender.com/hobbies/${id}`).then((response) => response.data[0])
})

export const hobbyAdapter = createEntityAdapter<Hobby>({
  selectId: (hobby) => hobby.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const hobbySlice = createSlice({
  name: 'hobby',
  initialState: hobbyAdapter.getInitialState({ status: 'idle' }),
  reducers: {
    hobbyAdded: hobbyAdapter.addOne,
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
      hobbyAdapter.updateOne(state, payload)
    })
    .addCase(addHobby.pending, (state) => {
      state.status = 'loading'
    })
    .addCase(addHobby.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      hobbyAdapter.addOne(state, payload)
    })
    .addCase(getHobbyById.pending, (state, { payload }) => {
      state.status = 'loading'
    })
    .addCase(getHobbyById.fulfilled, (state, { payload }) => {
      state.status = 'idle'
      return payload
    })
  }
})

export const hobbySelectors = hobbyAdapter.getSelectors((state: RootState) => state.hobby)

export default hobbySlice.reducer
