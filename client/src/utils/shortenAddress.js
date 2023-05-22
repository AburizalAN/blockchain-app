const shortenAddress = (value) => {
  return value ? `${value.slice(0, 5)}......${value.slice(value.length - 4)}` : "......";
} 

export default shortenAddress