import createLayout from 'ngraph.forcelayout';

export default function createForceLayout(graph, qs) {
    let physics = {};
    if (Number.isFinite(qs.get('timeStep'))) physics.timeStep = qs.get('timeStep');
    if (Number.isFinite(qs.get('adaptiveTimeStep'))) physics.adaptiveTimeStep = qs.get('adaptiveTimeStep');
    if (Number.isFinite(qs.get('springLength'))) physics.springLength = qs.get('springLength');
    if (Number.isFinite(qs.get('springCoeff'))) physics.springCoeff = qs.get('springCoeff');
    if (Number.isFinite(qs.get('dragCoeff'))) physics.dragCoeff = qs.get('dragCoeff');

    return createLayout(graph, {
      ...physics
    });
}