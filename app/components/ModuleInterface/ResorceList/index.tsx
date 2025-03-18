import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const resources = [
  { id: '1', type: 'pdf', title: 'Resource 1', uri: 'http://example.com/resource1.pdf' },
  { id: '2', type: 'link', title: 'Resource 2', uri: 'http://example.com/resource2' },
  { id: '3', type: 'video', title: 'Resource 3', uri: 'http://example.com/resource3.mp4' },
  { id: '4', type: 'article', title: 'Resource 4', uri: 'http://example.com/resource4' },
];

const ResourceList = () => {
  const renderItem = ({ item }: { item: { id: string; type: string; title: string; uri: string } }) => {
    let icon: 'file-pdf-o' | 'link' | 'video-camera' | 'file-text-o' | 'file-o';
    switch (item.type) {
      case 'pdf':
        icon = 'file-pdf-o';
        break;
      case 'link':
        icon = 'link';
        break;
      case 'video':
        icon = 'video-camera';
        break;
      case 'article':
        icon = 'file-text-o';
        break;
      default:
        icon = 'file-o';
    }

    return (
      <View style={styles.resourceItem}>
        <FontAwesome name={icon} size={24} color="black" />
        <Text style={styles.resourceTitle}>{item.title}</Text>
        <TouchableOpacity style={styles.bookmarkButton}>
          <FontAwesome name="bookmark-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={resources}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default ResourceList;