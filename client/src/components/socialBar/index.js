import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';

export class SocialBar extends RkComponent {
  componentName = 'SocialBar';
  typeMapping = {
    container: {},
    section: {},
    icon: {},
    label: {}
  };

  constructor(props) {
    super(props);
    let likes = 25 + Math.floor(Math.random() * 50)
    this.likes = this.props.likes || likes;
    this.comments = this.props.comments || 26;
    this.shares = this.props.shares || 5;
    this.state = {
      likes: this.likes,
      hasLiked: false
      //comments: this.comments,
      //shares: this.shares,
    }
  }

  render() {
    let {container, section, icon, label} = this.defineStyles();

    let likes = this.state.likes + (this.props.showLabel ? ' Likes' : '');
    //let comments = this.state.comments + (this.props.showLabel ? ' Comments' : '');
    //let shares = this.state.shares + (this.props.showLabel ? ' Shares' : '');

    let updateLikes = () => {
      if (this.state.likes === this.likes) {

        this.setState({hasLiked: true })
        this.setState({likes: this.state.likes + 1});
      }
      else {
        this.setState({hasLiked: false })
        this.setState({likes: this.likes});
      }
    };

    /*let updateComments = () => {
      if (this.state.comments === this.comments)
        this.setState({comments: this.state.comments + 1});
      else
        this.setState({comments: this.comments});
    };

    let updateShares = () => {
      if (this.state.shares === this.shares)
        this.setState({shares: this.state.shares + 1});
      else
        this.setState({shares: this.shares});
    };*/

    const likeButton = this.state.hasLiked ? 
      <RkText rkType='awesome primary' style={icon}>{FontAwesome.heart}</RkText> :
      <RkText rkType='awesome primary' style={icon}>{FontAwesome.emptyHeart}</RkText>
      
    
    return (
      <View style={container}>
        <View style={section}>
          <RkButton rkType='clear' onPress={updateLikes}>
            {likeButton}
            <RkText rkType='primary primary4' style={label}>{likes}</RkText>
          </RkButton>
        </View>
       {/*<View style={section}>
          <RkButton rkType='clear' onPress={updateComments}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.comment}</RkText>
            <RkText rkType='primary4 hintColor' style={label}>{comments}</RkText>
          </RkButton>
        </View>
        <View style={section}>
          <RkButton rkType='clear' onPress={updateShares}>
            <RkText rkType='awesome hintColor' style={icon}>{FontAwesome.user}</RkText>
            <RkText rkType='primary4 hintColor' style={label}>{shares}</RkText>
          </RkButton>
        </View>*/}
      </View>
    )
  }
}