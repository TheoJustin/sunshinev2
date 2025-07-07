import { useEffect, useState } from "react";
import { Actor, HttpAgent } from "@dfinity/agent";
import { Graph } from '../components/prediction/Graph'

function PredictionPage() {
    const data = [
        {
          "id": "BTC",
          "data": [
            {
              "x": "10",
              "y": 50
            },
            {
              "x": "11",
              "y": 211
            },
            {
              "x": "12",
              "y": 283
            },
            {
              "x": "13",
              "y": 1
            },
            {
              "x": "14",
              "y": 129
            },
            {
              "x": "15",
              "y": 242
            },
            {
              "x": "16",
              "y": 274
            },
            {
              "x": "17",
              "y": 233
            },
            {
              "x": "18",
              "y": 105
            },
            {
              "x": "19",
              "y": 2
            },
            {
              "x": "20",
              "y": 237
            },
            {
              "x": "21",
              "y": 43
            }
          ]
        },
        {
          "id": "ETH",
          "data": [
            {
              "x": "10",
              "y": 173
            },
            {
              "x": "11",
              "y": 187
            },
            {
              "x": "12",
              "y": 128
            },
            {
              "x": "13",
              "y": 124
            },
            {
              "x": "14",
              "y": 198
            },
            {
              "x": "15",
              "y": 64
            },
            {
              "x": "16",
              "y": 292
            },
            {
              "x": "17",
              "y": 174
            },
            {
              "x": "18",
              "y": 96
            },
            {
              "x": "19",
              "y": 112
            },
            {
              "x": "20",
              "y": 171
            },
            {
              "x": "21",
              "y": 172
            }
          ]
        }
      ]

    return (
        <div>
            <Graph data={data} />
        </div>
    );
}

export default PredictionPage;