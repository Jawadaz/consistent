import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const Input = styled('input')({
  display: 'none',
});

function LoadProjectPage(){
    return <>
    <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
    </label>
    </>
}

export default LoadProjectPage;