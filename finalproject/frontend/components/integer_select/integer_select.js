import { Autocomplete, TextField } from "@mui/material"
import styles from "./integer_select.module.css"

export default function IntegerSelect({ num, unit=null, decimalSlots, variableName, setVariable }) {
  const keyArray = [...Array(num).keys()]
  if (decimalSlots > 0) {
    var optionArray = keyArray.map(item => (item / (10 * decimalSlots)).toString()) 
  }
  else {
    var optionArray = keyArray.map(item => (item).toString()) 
  }
  const labelUnit = unit?`(${unit})`:''
  const word = variableName[0].toUpperCase()
  const firstLetter = word.charAt(0)
  const restOfWord = word.slice(1).toLowerCase()
  const label = firstLetter + restOfWord
  return (
    <Autocomplete
    className={styles.field}
    options={optionArray}
    autoComplete={true}
    autoHighlight={true}
    required
    autoSelect={true}
    clearOnEscape
    name={variableName}
    onChange={(event) => {
      setVariable(event.target.value)
    }}
    renderInput={(params) => (
      <TextField {...params} label={`${label} ${labelUnit}`} variant='standard' />
    )}
  />
  )
}