import createReducer from '../lib/createReducer'
import * as types from '../actions/types'

// export const searchedRecipes = createReducer({}, {
//   [types.SET_SEARCHED_RECIPES](state, action) {
//     let newState = {}
//     action.recipes.forEach( (recipe) => {
//       let id = recipe.href
//       newState[id] = Object.assign({}, recipe, { id });
//     });
//     return newState;
//   }
// });
//

export const messageObj = createReducer({
  //  messageID : 1,
  // messageText : "hi im sainath",
  // data : [],
},{
  //there should be two reducers for this
  //one that adds messages recieved
  //one that adds messages sent
  //what if i write if condition
  //if messages.from == self
  //then add it in messages[to]
  //else add it in
  // messages[from]
    [types.ADD_MESSAGE](state,action){
        // let newState = {}
        // action.name
        // console.log( action.messages.sirname);
        // console.log( action.messages.name);
        // return {...state,
        //   data:  action.messages,
        // }
        // return {...state,
        //   messageID : 2,
        //   messageText : "yoohoho",
        // }
        console.log("----------+++",action);
        //losing previos state so loosing those two things in {} above
        // let newState = {};
        // // action.messages.forEach((message) =>{
        // //   newState[message.email] = message
        // // })
        // senderId = action.messages.sent_by;
        // newState = [ ...state[senderId] , action.messages];
        //
        // entryName = "entryname";
        //
        //if (sender == me)
        //add it on [recieved_by]
        //else
        // add it on their resp obj

          // avatar: 'https://facebook.github.io/react/img/logo_og.png',
        // };
        return { ...state,
          [action.messages.chat_pair_id] : [
            ...state[action.messages.chat_pair_id] || [],
            action.messages,
            // user
          ],




        }


        // if (action.messages.sent_by == "sai" ){
        //   return { ...state,
        //     [action.messages.recieved_by] : [
        //       ...state[action.messages.recieved_by] || [],
        //       action.messages
        //     ]
        //   }
        // }
        // else {
        //   return { ...state,
        //       [action.messages.sent_by] : [
        //         ...state[action.messages.sent_by] || [],
        //         action.messages
        //       ]
        //     }
        //
        // }
    }
});
