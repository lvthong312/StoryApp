import { StyleSheet, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import AxiosInstance from '../axios/AxiosInstance';
import { IStory } from '../modal/StoryModel';
import { Text, Card } from '@rneui/themed';
import CommentCard from './CommentCard';
import { formatTimeAgo } from '../utils';
import { GET_STORY_BY_ID_API } from '../services/ApiUrl';

interface IProps {
  storyId: number;
  count: number;
}
const SubComment = ({ storyId, count = 0 }: IProps) => {
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
  const renderSubComment = useMemo(() => {
    if (comment?.kids?.length > 0) {
      return (
        <View>
          <Card.Divider />
          {comment?.kids?.map((item, index) => (
            <SubComment key={`SubComment_${item}_${index}`} storyId={item} count={count + 1} />
          ))}
        </View>
      );
    } else {
      return null;
    }
  }, [storyId, comment?.kids]);
  const timeAgo = formatTimeAgo(comment?.time);
  return (
    <View style={{ marginHorizontal: count * 10 }}>
      <CommentCard
        renderRight={() => (
          <Text style={styles.timeAgoText} numberOfLines={3}>
            {timeAgo}
          </Text>
        )}
        style={{ marginBottom: 4 }}
        by={comment?.by}
        descendants={comment?.descendants}
      />
      <Text style={styles.marginBottom10} numberOfLines={3}>
        {comment?.title}
      </Text>
      <Text style={styles.marginBottom10} numberOfLines={3}>
        {comment?.text}
      </Text>

      {renderSubComment}
    </View>
  );
};

export default SubComment;

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
