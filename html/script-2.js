const addMatch = document.querySelector(".add_match");
const allMatches = document.querySelector(".all-matches");
const reset = document.querySelector(".lws-reset");

let initialState = [
  {
    match: "MATCH 1",
    id: 1,
    score: 10,
  },
];

function matchesReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case "add-match": {
      let newMatches = {
        match: `MATCH ${state.length + 1}`,
        id: state.length + 1,
        score: 0,
      };
      console.log(newMatches);
      return [...state, newMatches];
    }
    case "reset": {
      for (let i = 0; i < state.length; i++) {
        state[i].score = 0;
      }
      return state;
    }
    default: {
      return state;
    }
  }
}

const store = Redux.createStore(matchesReducer);
function render() {
  const state = store.getState();
  allMatches.textContent = "";
  state?.map((match) => {
    allMatches.innerHTML += `
        <div class="match">
        <div class="wrapper">
          <button class="lws-delete" data-id=${match.id}>
            <img src="./image/delete.svg" alt="" />
          </button>
          <h3 class="lws-matchName">Match ${match.id}</h3>
        </div>
        <div class="inc-dec">
          <form class="incrementForm" data-id=${match.id}>
            <h4>Increment</h4>
            <input type="number" name="increment" class="lws-increment" />
          </form>
          <form class="decrementForm" data-id=${match.id}>
            <h4>Decrement</h4>
            <input type="number" name="decrement" class="lws-decrement" />
          </form>
        </div>
        <div class="numbers">
          <h2 class="lws-singleResult">${match.score}</h2>
        </div>
      </div>
        `;
  });
}
render();
store.subscribe(render);

addMatch.addEventListener("click", () => {
  store.dispatch({
    type: "add-match",
  });
});

reset.addEventListener("click", () => {
  store.dispatch({
    type: "reset",
  });
});
