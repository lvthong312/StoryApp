import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../axios/AxiosInstance';
import { IStory } from '../modal/StoryModel';
import { Text, lightColors, ListItem, Image } from '@rneui/themed';
import images from '../assets';
import TimeCard from './TimeCard';
import CommentCard from './CommentCard';
import { GET_STORY_BY_ID_API } from '../services/ApiUrl';

interface IProps {
  storyId: number;
  onPressStory: any;
}
const StoryHorizontal = ({ storyId, onPressStory }: IProps) => {
  const [story, setStory] = useState<IStory | any>(null);

  useEffect(() => {
    if (storyId) {
      AxiosInstance.post(GET_STORY_BY_ID_API, {
        id: storyId,
      }).then((response: any) => {
        setStory(response);
      });
    }
  }, [storyId]);

  return (
    <>
      <View style={styles.list}>
        <ListItem onPress={() => onPressStory(story)}>
          <Image
            source={storyId % 2 ? images.im_ai : images.im_technogogy}
            style={styles.storyImage}
          />
          <ListItem.Content>
            <TimeCard time={story?.time} score={story?.score} />
            <ListItem.Title numberOfLines={2} style={{ fontWeight: '700' }}>
              {story?.title}
            </ListItem.Title>
            <View style={styles.subtitleView}>
              <Text numberOfLines={3}>{story?.text}</Text>
            </View>
            {/* <Text style={styles.timeAgoText}>{formatTimeAgo(story?.time)}</Text> */}
            <CommentCard by={story?.by} descendants={story?.descendants} />
          </ListItem.Content>
        </ListItem>
      </View>
    </>
  );
};

export default StoryHorizontal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: lightColors.greyOutline,
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  storyImage: {
    height: 100,
    width: 100,
  },
  timeAgoText: {
    color: 'grey',
    marginTop: 10,
    textAlign: 'right',
    textAlignVertical: 'bottom',
  },
});
