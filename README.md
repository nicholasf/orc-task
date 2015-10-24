
## Approach

The main consideration for designing a solution to this task is how to satisfy dependencies between expressions in a clean way.

By 'clean' I mean an approach that does not fall into complexity when dealing with cyclic dependencies (e.g. A3 requires B3 which requires A3).

### Design

#### Models

A Sheet is an ordered collection of Cells. Probably a 2D matrix.

A Cell has a name (e.g. 'A3'), a state, and an Expression.

A Cell's state can be in one of three - INITIAL, UNEVALUATED, EVALUATED or ERR. 

An Expression has a raw string, a dependencies list (names of Cells required to be evaluated for the expression).

#### Execution
 
After data parsing has resulted in a Sheet of Cells in the INITIAL state, loop through all Cells and have each validate their dependencies. 

The Cell can request the Sheet to validate a dependency list, the Sheet can then compare the dependencies of the Cells referencing each other. If there is a cycle in the dependency graph all Cells belonging to it will be set to ERR state. 

If not, the Cell is placed in the UNEVALUATED state.

Now all Cells will either be in ERR or UNEVALUATED. Loop through the unenevaluated Cells and solve their Expressions, one by one. Evaluate dependencies in Expressions as they are discovered. 

Expressions that reference other Expressions that evaluate to an error will be marked with an ERR, otherwise they will be EVALUATED.

Then, render the sheet to CSV format.
