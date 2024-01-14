import { axiosStore } from '../axios/axiosStore'

export default async function getStores() {
  try {
    const res = await axiosStore.get('/stores')
    return res
  } catch (error) {
    console.log('error get store: ', error)
  }
}
