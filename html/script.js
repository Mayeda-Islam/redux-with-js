let matchesContainer = document.querySelector(".all-matches");
let addMatch = document.querySelector(".lws-addMatch");
let resetMatch = document.querySelector(".lws-reset");

const initialState = [
  {
    match: "MATCH 1",
    score: 0,
    id: 1,
  },
];

function matchesReducer(state = initialState, action) {
  console.log(state);
  switch (action.type) {
    case "increment": {
      let updatedScore = state.map((match) => {
        if (match.id === +action.payload.id) {
          return {
            ...match,
            score: match.score + action.payload.score,
          };
        } else {
          return match;
        }
      });
      return updatedScore;
    }
    case "decrement": {
      let updatedScore = state.map((match) => {
        if (match.id === +action.payload.id) {
          return {
            ...match,
            score: Math.max(0, match.score - action.payload.score),
          };
        } else {
          return match;
        }
      });
      return updatedScore;
    }
    case "delete": {
      let updateStore = state.filter(
        (match) => match.id !== +action.payload.id
      );
      return updateStore;
    }
    case "add-match": {
      let new_match = {
        match: "MATCH" + (state.length + 1),
        score: 0,
        id: state.length + 1,
      };
      return [...state, new_match];
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
const render = () => {
  const state = store.getState();
  console.log(state);
  matchesContainer.innerHTML = "";
  state?.map((data) => {
    matchesContainer.innerHTML += `
    <div class="match">
    <div class="wrapper">
        <button class="lws-delete" data-id=${data.id} onClick="handelDelete.call(this, event)">
        <img data-id=${data.id}  src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">${data.match}</h3>
    </div>
    <div class="inc-dec">
        <form class="incrementForm" data-id=${data.id} onSubmit="handelIncrement.call(this, event)">
            <h4>Increment</h4>
            <input
                type="number"
                name="increment"
                class="lws-increment"
                />
        </form>
        <form class="decrementForm" data-id=${data.id} onSubmit="handelDecrement.call(this, event)">
            <h4>Decrement</h4>
            <input
                type="number"
                name="decrement"
                class="lws-decrement"
                />
        </form>
    </div>
    <div class="numbers">
        <h2 class="lws-singleResult">${data.score}</h2>
    </div>
</div>
      `;
  });
};

render();
store.subscribe(render);

function handelIncrement(event) {
  event.preventDefault();
  const incrementInput = this.elements["increment"];
  const incrementValue = incrementInput.value;
  const matchId = event.target.dataset.id;
  console.log(incrementValue, matchId);
  store.dispatch({
    type: "increment",
    payload: {
      score: +incrementValue,
      id: matchId,
    },
  });
}
function handelDecrement(event) {
  event.preventDefault();
  const decrementInput = this.elements["decrement"];
  const decrementValue = decrementInput.value;
  const matchId = event.target.dataset.id;
  console.log(decrementValue, matchId);
  store.dispatch({
    type: "decrement",
    payload: {
      score: +decrementValue,
      id: matchId,
    },
  });
}
function handelDelete(event) {
  event.preventDefault();
  console.log("clicked");
  const matchId = event.target.dataset.id;
  console.log(matchId);
  store.dispatch({
    type: "delete",
    payload: {
      id: +matchId,
    },
  });
}

addMatch.addEventListener("click", () => {
  store.dispatch({
    type: "add-match",
  });
});
resetMatch.addEventListener("click", () => {
  store.dispatch({
    type: "reset",
  });
});
