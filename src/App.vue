<template>
  <div id="app">
    <h2>The brighter the node - the more force is applied to it compared to other forces on the same frame.
    <a href="https://twitter.com/anvaka/status/1295619610893365248">discuss...</a>
    </h2>
    <div class='content'>
      1. Select a graph: <select v-model='selectedGraph' :disable='loading'>
        <option v-for="graph in graphs" :key='graph' :value='graph'>{{graph}}</option>
      </select>
      <div v-if='!loading' class='layout-box'>
      2. To make {{stepCount}} layout steps <a href="#" @click.prevent='runLayout'>CLICK HERE</a> 
      </div>

      <div v-if='loading'>Loading graph...</div>
    </div>
  </div>
</template>

<script>
import createGraphScene from './lib/createGraphScene';
import getAvailableGraphs from './lib/getAvailableGraphs';
import loadGraph from './lib/loadGraph';
import bus from './lib/bus';
import queryState from 'query-state';

let layouts = ['ngraph.forcelayout'];
let appState = queryState({graph: 'Binary'}, { useSearch: true });

export default {
  name: 'app',
  methods: {
    runLayout() {
      this.scene.runLayout(this.stepCount);
    },
    loadNewGraph(newGraph) {
      this.loading = true;

      loadGraph(newGraph, appState).then(newGraph => {
        bus.fire('load-graph', newGraph, appState);
        this.loading = false;
      });
    }
  },
  watch: {
    selectedGraph(newGraph) {
      appState.set('graph', newGraph);
      this.loadNewGraph(newGraph);
    }
  },
  data() {
    let graphs = getAvailableGraphs();
    return {
      stepCount: getStepCountFromAppState(),
      selectedGraph: appState.get('graph'),
      layouts,
      selectedLayout: getLayoutFromAppStateSafe(),
      loading: false,
      graphs
    }
  },
  mounted() {
    const canvas = document.getElementById('cnv');
    this.scene = createGraphScene(canvas);
    this.loadNewGraph(this.selectedGraph);
  },

  beforeDestroy() {
    if (this.scene) {
      this.scene.dispose();
    }
  }
}

function getStepCountFromAppState() {
  let step = appState.get('step');
  return (Number.isFinite(step) && step > 0) ? step : 1000;
}

function getLayoutFromAppStateSafe() {
  let layout = appState.get('layout');
  if (layouts.indexOf(layout) > -1) {
    return layout;
  }
  return layouts[0];
}
</script>

<style>
#app {
  position: absolute;
  max-width: 400px;
  background: rgb(12, 41, 82);
  border: 1px solid white;
  padding: 8px;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.row .label {
  flex: 1;
}
.row .value {
  flex: 1;
}
.row select {
  width: 100%;
}
.btn-command {
  display: block;
  padding: 4px;
  margin-top: 10px;
  border: 1px solid;
}

a {
  color: rgb(244, 244, 244);
  text-decoration: none;
  border-bottom: 1px dashed;
  text-align: center;
  padding: 0 4px
}
h2 {
  margin: 8px 0 16px 0;
  font-size: 18px;
  font-weight: normal;
}
.number {
  color: yellow;
  font-size: 18px;
}
</style>
