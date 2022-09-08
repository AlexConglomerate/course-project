import React, {useState} from "react";


const Table = () => {
    return (
        <>
            <table className="table table-hover">
                <thead>
                <tr>
                    <td>Имя</td>
                    <td>Качества</td>
                    <td>Профессия</td>
                    <td>Встретился, раз</td>
                    <td>Оценка</td>
                    <td>Button</td>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>5</td>
                    <td>Delete</td>
                </tr>
                <tr>
                    <td>11</td>
                    <td>12</td>
                    <td>13</td>
                    <td>14</td>
                    <td>15</td>
                    <td>1Delete</td>

                </tr>
                <tr>
                    <td>21</td>
                    <td>22</td>
                    <td>23</td>
                    <td>24</td>
                    <td>25</td>
                    <td>2Delete</td>
                </tr>
                </tbody>
            </table>
        </>
    )
}

export default Table
