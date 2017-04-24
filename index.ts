import { autorun, observable } from 'mobx'

class Larry {
  @observable hi = 3
}


const m = observable({hello:3})
autorun(() => {
  console.log(m.hello)
})

m.hello = 4
