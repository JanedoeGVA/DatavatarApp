const initialState = {
    byId: ['1', '2', '3'],
    byHash: {
      '1': {id: '1', content: {title: 'item 1'}},
      '2': {id: '2', content: {title: 'item 2'}},
      '3': {id: '3', content: {title: 'item 3'}}
    }
  }
  
  const action1 = {
    type: 'add',
    id: '4',
    payload: { id: '4', content: {title: 'item 4' }}
  }
  
  const action2 = {
    type: 'update',
    id: '2',
    payload: { content: {title: 'item 2 updated' }}
  }
  
  const action3 = {
    type: 'remove',
    id: '4'
  }
  
  const reducer = (state = intialState, action = {}) => {
    switch(action.type){
      case 'add': {
        return {
          byId: [ ...state.byId, action.id],
          byHash: {
            ...state.byHash,
            [action.id]: action.payload
          }
        }
      }
        
      case 'update': {
        state.byHash[action.id] = {
          ...state.byHash[action.id],
          ...action.payload
        }
        return {
          ...state
        }
      }  
        
      case 'remove': {
        const prunedIds = state.byId.filter(item => {
          return item !== action.id // return all the items not matching the action.id
        })
        delete state.byHash[action.id] // delete the hash associated with the action.id
        
        return {
          byId: prunedIds,
          byHash: state.byHash
        }
      }
      
      default: {
        return state
      }
    }
  }

  // assuming Redux passes in the state object as this.props.data
class viewData {

    Object.entries(data).map(([key, value]) => (
        <View>
          <Text>{`${key} :`}</Text>
          <View style={styles.shiftLeft}>
            { value.map(({ title, id}) => <Text key={id}>{`id: ${id}, title: "${title}"`}</Text>)}
          </View>
        </View>
      ))}
    }
return this.props.data.byId.map((item, index) => (
    <View key={index}>
      {this.props.data.byHash[item].content.title}
    </View>
  )
}