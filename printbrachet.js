let result='';
function printParenthesis(i, j, n, path) {
  if (i  == j) {
   result+=`A${i+1}`;
    return;
  }

  result+="(";
  printParenthesis(i, path[i][j], n, path);
  printParenthesis(path[i][j] + 1, j, n, path);
  result+=")";
  
  return result
}
