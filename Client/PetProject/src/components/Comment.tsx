import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AxiosInstance from '../axios/AxiosInstance';
import { IStory } from '../modal/StoryModel';
import { Text, Card } from '@rneui/themed';
import CommentCard from './CommentCard';
import { formatTimeAgo } from '../utils';
import SubComment from './SubComment';
import { GET_STORY_BY_ID_API } from '../services/ApiUrl';

interface IProps {
  storyId: number;
  count: number;
}
const Comment = ({ storyId, count = 0 }: IProps) => {
  const [comment, setComment] = useState<IStory | null>(null);
  useEffect(() => {
    if (storyId) {
      AxiosInstance.post(GET_STORY_BY_ID_API, {
        id: storyId,
      }).then((response: any) => {
        setComment(response);
      });
    }
  }, [storyId]);

  const timeAgo = formatTimeAgo(comment?.time);
  if (!comment?.text && !comment?.title) return null
  return (
    <View style={{ marginHorizontal: count * 10 }}>
      <CommentCard
        renderRight={() => (
          <Text style={styles.timeAgoText} numberOfLines={3}>
            {timeAgo}
          </Text>
        )}
        by={comment?.by}
        style={{ marginBottom: 4 }}
        descendants={comment?.descendants}
        showComment={false}
      />
      <Text style={styles.marginBottom10} numberOfLines={3}>
        {comment?.title}
      </Text>
      <Text style={styles.marginBottom10} numberOfLines={3}>
        {comment?.text}
      </Text>
      <Card.Divider />
      {comment?.kids?.length > 0 ? <SubComment storyId={comment?.id} count={1} /> : null}
    </View>
  );
};

export default Comment;

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
  timeAgoText: {
    color: 'grey',
  },
});
