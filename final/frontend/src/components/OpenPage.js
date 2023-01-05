import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Divider from '@mui/material/Divider';
import { createTheme, ThemeProvider, Typography } from '@mui/material';
import { handleQuery ,DeleteSong} from '../axios';
import { FixedSizeList } from 'react-window';
import { useState } from 'react';
import './css/OpenPage.css';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Fuzzy Bubbles',
      'Arial',
    ].join(','),
  },});

const BoxSx = { width: '1000px', backgroundColor: 'transparent'  }
const ListItemTextSx = {color: "#F5F5F5"}
const ListItemButtonSx = {"&:hover":{ bgcolor: '#696969'}}

const HoverClearSx = {"&:hover":{ color: '#c9c9c9'},color:"#636363"}
const HoverSongSx = {"&:hover":{ color: '#FDB924'},color:"#f5f5f5"}

const OpenPage = ({works, setWorks, setComposer, setFilename, setEdit, setSong, user}) => {

    const open_page = async(id) => {
        // console.log(id)
        const songFromQuery = await handleQuery(id);
        setSong(songFromQuery.song)
        setEdit(true)
        setComposer(songFromQuery.composer)
        setFilename(songFromQuery.name)
    }

    const deleteSong = async(id) => {
        const message = await DeleteSong(id,user);
        if(message === "delete success"){
            const worksToBeFiltered = works.filter(e => e.id !== id);
            setWorks(worksToBeFiltered);
        }
        
    }

    function renderRow(props) {
        const { index, style } = props;
        const revIndex = works.length - 1 - index;
      
        return (
            <ListItem style={style} key={index} component="div"  disablePadding secondaryAction={
                <IconButton aria-label="clear" sx={HoverClearSx} onClick={() =>{
                    deleteSong(works[revIndex].id);
                }}>
                <ClearIcon />
                </IconButton>
                }>
                <ListItemButton sx={HoverSongSx}>
                    <ListItemText primary = {`${index+1}. ${works[revIndex].name} - ${works[revIndex].composer}`}
                        onClick={() => {open_page(works[revIndex].id)}} />
                </ListItemButton>
          </ListItem>
        );
      }


    function VirtualizedList() {
        return (
          
            <FixedSizeList
              height={400}
              width={1000}
              itemSize={46}
              itemCount={works.length}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>
        );
    }
    /*
    const previous_musics = [{name: "First composition"},
                             {name: "Second composition"},
                             {name: "Third composition"}];
    */
    return (
        <ThemeProvider theme={theme}>
            <Typography>
                <Box sx={BoxSx}>
                <nav aria-label="previous_musics">
                    <VirtualizedList/>
                </nav>
                </Box>
            </Typography>
        </ThemeProvider>
    );
}
export default OpenPage;