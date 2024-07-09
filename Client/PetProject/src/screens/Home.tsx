import {
  Button,
  FlatList,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { IStory, IStoryScroll } from '../modal/StoryModel';
import Story from '../components/Story';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { BEST_STORY_SCREEN, NEW_STORY_SCREEN, STORY_DETAIL_SCREEN, TOP_STORY_SCREEN } from '../constants/ScreenKey';
import { GET_BEST_STORIES_API, GET_NEW_STORIES_API, GET_TOP_STORIES_API } from '../services/ApiUrl';

const Home = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const { data: newStories }: IStoryScroll = useInfiniteScroll({
    url: GET_NEW_STORIES_API,
    limit: 7,
    key: ['newstories'],
  });
  const { data: bestStories }: IStoryScroll = useInfiniteScroll({
    url: GET_BEST_STORIES_API,
    limit: 7,
    key: ['beststories'],
  });
  const { data: topStories }: IStoryScroll = useInfiniteScroll({
    url: GET_TOP_STORIES_API,
    limit: 7,
    key: ['topstories'],
  });

  const sectionData = useMemo(() => {
    let stories: any = {};
    stories['bestStories'] = {
      title: 'Best Stories',
      type: 'bestStories',
      data: bestStories || [],
    };
    stories['topStories'] = {
      title: 'Top Stories',
      type: 'topStories',
      data: topStories || [],
    };
    stories['newStories'] = {
      title: 'New Stories',
      type: 'newStories',
      data: newStories || [],
    };

    return Object.values(stories);
  }, [newStories, topStories, bestStories]);

  const StoriesHeader = ({ title, onPressMore }: { title: string; onPressMore: any }) => {
    return (
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        <Button title="View More" onPress={onPressMore} />
      </View>
    );
  };
  const onPressStory = useCallback((story: IStory) => {
    navigation.navigate(STORY_DETAIL_SCREEN, { story: story });
  }, []);
  const renderStory = ({ item, index }: any) => {
    return <Story storyId={item} onPressStory={onPressStory} />;
  };
  const keyExtractor = (storyId: number) => `newStories_${storyId?.toString()}`;

  const renderSectionHeader = (section: any) => {
    return (
      <View>
        {section?.type == 'newStories' && (
          <View>
            <StoriesHeader
              title={'NEW STORY'}
              onPressMore={() => navigation.navigate(NEW_STORY_SCREEN)}
            />
            <FlatList
              data={section?.data}
              renderItem={renderStory}
              contentContainerStyle={styles.flatlistContent}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
              horizontal
            />
          </View>
        )}

        {section?.type == 'bestStories' && (
          <View>
            <StoriesHeader
              title="BEST STORY"
              onPressMore={() => navigation.navigate(BEST_STORY_SCREEN)}
            />
            <FlatList
              data={section?.data}
              renderItem={renderStory}
              contentContainerStyle={styles.flatlistContent}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
              horizontal
            />
          </View>
        )}

        {section?.type == 'topStories' && (
          <View>
            <StoriesHeader
              title="TOP STORY"
              onPressMore={() => navigation.navigate(TOP_STORY_SCREEN)}
            />
            <FlatList
              data={section?.data}
              renderItem={renderStory}
              contentContainerStyle={styles.flatlistContent}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
              horizontal
            />
          </View>
        )}
      </View>
    );
  };
  return (
    <View>
      <SectionList
        sections={sectionData}
        renderItem={() => null}
        renderSectionHeader={({ section }) => renderSectionHeader(section)}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  flatlistContent: {
    paddingRight: 20,
    paddingBottom: 30,
  },
});
