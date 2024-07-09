import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../axios/AxiosInstance';
import { IStory } from '../modal/StoryModel';
import { Text, Card, Button } from '@rneui/themed';
import images from '../assets';
import CommentCard from './CommentCard';
import TimeCard from './TimeCard';
import { GET_STORY_BY_ID_API } from '../services/ApiUrl';

interface IProps {
  storyId: number;
  onPressStory: any;
}
const Story = ({ storyId, onPressStory }: IProps) => {
  const [story, setStory] = useState<IStory | null>(null);
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
    <Card wrapperStyle={styles.container}>
      <TimeCard time={story?.time} score={story?.score} style={{ marginBottom: 10 }} />
      <Card.Image
        style={{ padding: 0 }}
        source={storyId % 2 ? images.im_ai : images.im_technogogy}
      />
      <Card.Title style={styles.marginBottom10} numberOfLines={2}>
        {story?.title}
      </Card.Title>
      <Text style={styles.marginBottom10} numberOfLines={3}>
        {story?.text}
      </Text>

      <View style={{ flex: 1, justifyContent: 'flex-end', marginTop: 12 }}>
        <Button onPress={() => onPressStory(story)} title="VIEW NOW" />
        <CommentCard by={story?.by} descendants={story?.descendants} />
      </View>
    </Card>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    width: 250,
    height: 400,
  },
  title: {
    fontWeight: '700',
  },
  marginBottom10: { marginBottom: 10 },
  voteText: {
    marginTop: 10,
    color: 'grey',
  },
});
