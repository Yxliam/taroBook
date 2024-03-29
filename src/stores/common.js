import { observable, action, configure, runInAction } from 'mobx'

configure({ enforceActions: 'always' })

class commonStore {

  @observable counter = 1

  @action increment = () => {
    this.counter ++
  }

  @action decrement = () => {
    this.counter --
  }

  @action.bound incrementAsync = () => {
    setTimeout(() => {
      runInAction(() => {
        this.counter ++
      })
    }, 1000)
  }
}

export default new commonStore()