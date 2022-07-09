import { Box, Typography } from "@mui/material";
import React, { Component } from "react";
import Config from "../../helpers/config/Config";
import ContentEditable from "../common/ContentEditable";

export class TaskRow extends Component<any, any> {
    constructor(props: any) {
      super(props);
    }
  
    onChange = (value: any) => {
      if (this.props.onUpdateTask) {
        this.props.onUpdateTask(this.props.item, { name: value });
      }
    };
  
    render() {
      return (
        <Box
          style={{
            display: 'flex',
            alignItems: 'center',
            top: this.props.top,
            paddingLeft: 12,
            paddingRight: 12,
            minHeight: this.props.itemheight + 4
          }}
          onClick={(e) => this.props.onSelectItem(this.props.item)}
        >
       
        <div className="color-dot" style={{
            width: 12, 
            height: 12, 
            borderRadius: 12, 
            marginRight: 8,
            background: this.props.item.color 
        }} />
  {/* this.props.nonEditable */}
          {true ? (
            <Box  sx={{display: 'flex', justifyContent: 'flex-start'}}  tabIndex={this.props.index} >
              <Typography >{this.props.label}</Typography>
            </Box>
          ) : (
            <ContentEditable value={this.props.label} index={this.props.index} onChange={this.onChange} />
          )}
        </Box>
      );
    }
  }
  