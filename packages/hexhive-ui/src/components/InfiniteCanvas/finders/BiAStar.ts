import * as PF from 'pathfinding'
import Heap from 'heap';

const { Util, Heuristic, DiagonalMovement } = PF;

// var Heap       = require('heap');
// var Util       = require('../core/Util');
// var Heuristic  = require('../core/Heuristic');
// var DiagonalMovement = require('../core/DiagonalMovement');

/**
 * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching 
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 * @param {number} opt.avoidStarcasing Add penalties to discourage turning and
 * causing a 'staircase' effect (defaults to false).
 * @param {number} opt.turnPenalty Penalty to add to turning. Higher numbers
 * discourage turning more (defaults to 1).
 */
export class AStarFinder{
    
    private allowDiagonal : boolean = false;
    private dontCrossCorners: boolean = false;
    private diagonalMovement : any;

    private heuristic: any;

    private avoidStaircase : boolean = false;

    private turnPenalty: number = 1;

    private weight: number = 1;

    constructor(opt: any) {
        opt = opt || {};
        this.allowDiagonal = opt.allowDiagonal;
        this.dontCrossCorners = opt.dontCrossCorners;
        this.heuristic = opt.heuristic || Heuristic.manhattan;
        this.weight = opt.weight || 1;
        this.diagonalMovement = opt.diagonalMovement;
        this.avoidStaircase = opt.avoidStaircase;
        this.turnPenalty = opt.turnPenalty || 1;

        if (!this.diagonalMovement) {
            if (!this.allowDiagonal) {
                this.diagonalMovement = DiagonalMovement.Never;
            } else {
                if (this.dontCrossCorners) {
                    this.diagonalMovement = DiagonalMovement.OnlyWhenNoObstacles;
                } else {
                    this.diagonalMovement = DiagonalMovement.IfAtMostOneObstacle;
                }
            }
        }

        // When diagonal movement is allowed the manhattan heuristic is not
        //admissible. It should be octile instead
        if (this.diagonalMovement === DiagonalMovement.Never) {
            this.heuristic = opt.heuristic || Heuristic.manhattan;
        } else {
            this.heuristic = opt.heuristic || Heuristic.octile;
        }
    }

    findPath(startX:  number, startY:  number, endX:  number, endY:  number, grid: PF.Grid) {
        var openList = new Heap(function(nodeA: any, nodeB: any) {
                return nodeA.f - nodeB.f;
            }),
            startNode = grid.getNodeAt(startX, startY),
            endNode = grid.getNodeAt(endX, endY),
            heuristic = this.heuristic,
            diagonalMovement = this.diagonalMovement,
            avoidStaircase = this.avoidStaircase,
            turnPenalty = this.turnPenalty,
            weight = this.weight,
            abs = Math.abs, SQRT2 = Math.SQRT2,
            lastDirection, node, neighbors, neighbor, i, l, x, y, ng;
    
        // set the `g` and `f` value of the start node to be 0
        (startNode as any).g = 0;
        (startNode as any).f = 0;
    
        // push the start node into the open list
        openList.push(startNode);
        (startNode as any).opened = true;
    
        // while the open list is not empty
        while (!openList.empty()) {
            // pop the position of node which has the minimum `f` value.
            node = openList.pop();
            node.closed = true;
    
            // if reached the end position, construct the path and return it
            if (node === endNode) {
                return (Util as any).backtrace(endNode);
            }
    
            // get neigbours of the current node
            neighbors = grid.getNeighbors(node, diagonalMovement);
            for (i = 0, l = neighbors.length; i < l; ++i) {
                neighbor = neighbors[i];
    
                if ((neighbor as any).closed) {
                    continue;
                }
    
                x = neighbor.x;
                y = neighbor.y;
    
                // get the distance between current node and the neighbor
                // and calculate the next g score
                ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
    
                // if we're avoiding staircasing, add penalties if the direction 
                // will change
                if (avoidStaircase) {
                    lastDirection = node.parent === undefined? undefined : { x : node.x - node.parent.x, y : node.y - node.parent.y };
                    var turned = lastDirection === undefined? 0 : (lastDirection.x !== x - node.x || lastDirection.y !== y - node.y) ? 1 : 0;
                    ng += turnPenalty * turned;
                }
    
                // check if the neighbor has not been inspected yet, or
                // can be reached with smaller cost from the current node
                if (!(neighbor as any).opened || ng < (neighbor as any).g) {
                    (neighbor as any).g = ng;
                    (neighbor as any).h = (neighbor as any).h || weight * heuristic(abs(x - endX), abs(y - endY));
                    (neighbor as any).f = (neighbor as any).g + (neighbor as any).h;
                    (neighbor as any).parent = node;
    
                    if (!(neighbor as any).opened) {
                        openList.push(neighbor);
                        (neighbor as any).opened = true;
                    } else {
                        // the neighbor can be reached with smaller cost.
                        // Since its f value has been updated, we have to
                        // update its position in the open list
                        openList.updateItem(neighbor);
                    }
                }
            } // end for each neighbor
        } // end while not open list empty
    
        // fail to find the path
        return [];
    };
}
