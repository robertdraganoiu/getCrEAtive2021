import React from 'react';
import Stack from 'stack-styled';
import Row from './Row';
import Cell from './Cell';

const Arena = ({rows, columns}) => {
    var matrix = [], row;
    for (let r = 0; r < rows; ++r) {
        row = [];

        for (let c = 0; c < columns; ++c) {
            // row.push(`${r}${c}`);
            row.push('$(r)$(c)');
        }

        matrix.push(row);
    }

    return (
        <div className="grid">
            {matrix.map((row, ri) => (
                <Row key={ri}>
                    {row.map(cellId => <Cell key={cellId} id={cellId} />)}
                </Row>
            ))}
        </div>
    );
}

export default Arena;