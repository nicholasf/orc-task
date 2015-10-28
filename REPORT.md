## Report

The non-trivial problems that stand out in this coding task hinge around the definition of a DSL that can resolve variable references. 

Postfix notation is not hard. What was obvious was that the challenges of this task lay in ensuring that variable dependency chains were resolved robustly. 

Some key points on resolving variable dependencies:

* a way of noticing cycles had to be put in place. a1 -> b2 -> a1 is an infinite recursion if not detected somehow. This is the simplest example of a cycle, they could be easily more complex.
* the order by which to evaluate expressions is defined by the order in which variables are referenced. This means letting each expression recursively resolve its dependencies before being resolved.
* modelling the relationship between CSV expressions could be potentially complex - as a DSL for naming expression ('a1', 'z5') has to be interpreted by another component in the relationship between the elements in a 2D array. 

I went through two approaches in thinking how to solve this. My Original Approach, at the bottom of the document, involved stages of processing to establish a clean data model. 

I've left it there if you're curious, though you only need to read the Simpler Approach to understand what I've made.

I realised my Original Approach could not be achieved in "3 to 4 hours", as the coding task requested, so I opted for a Simpler Approach.  

## Simpler Approach

Write a parser that can transform a 2D array robustly and iteratively. 

Once the 2D array is ready, encapsulate it with a Sheet abstraction that can resolve requests for 'a3'. The Sheet is essentially a context of evaulated and unevaluated expressions than can understand the custom variable DSL.

Pass each array item to the postfix parser, along with the Sheet. 

The postfix parser can request variables from the Sheet. The Sheet can `resolve` the expressions for these variables, check for dependency cycles (resulting in #ERR) and then ask the postfix parser to parse them. 

The postfix parser must either return #ERR or a valid result.

### Assumptions

* columns might exceed the 26 letters of the alphabet, so adopt the spreadsheet technique of accruing letters, e.g. 'AA', 'AAB'.
* given the time restriction in this task, opt for a simple 'data is beautiful' approach. Fight for simplicity. Don't impose another data model above the 2D array data structure (as I was considering in my Original Approach).

### Conclusion

I was unable to do this task in '3 to 4 hours'. It was more like 10 with background thinking while I was doing other things. 

I think there is a degree of elegance in my solution which only has the concept of a Sheet, internal 2D arrays and can then interact with a custom postfix parser to evaluate everything. To reduce it to so few moving pieces is appealing. 

Shortcomings of this approach might reside in that the interrelating functions between the Sheet and the parser have some complexity for a newcomer trying to absorb the code. 


## Original Approach

The main consideration for designing a solution to this task is how to satisfy dependencies between expressions in a clean way.

By 'clean' I mean an approach that does not fall into complexity when dealing with resolving cyclic dependencies (e.g. A3 requires B3 which requires A3)

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
