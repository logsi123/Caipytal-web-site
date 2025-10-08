import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const KnowledgeBasePreview = ({ article, onClose, onViewFull }) => {
  if (!article) return null;

  const formatReadTime = (minutes) => {
    return `${minutes} min de lecture`;
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-custom-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name={article?.icon || 'BookOpen'} size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-heading-semibold text-foreground">
              {article?.title}
            </h3>
            <div className="flex items-center space-x-3 text-xs text-muted-foreground mt-1">
              <span>{article?.category}</span>
              <span>•</span>
              <span>{formatReadTime(article?.readTime)}</span>
              {article?.difficulty && (
                <>
                  <span>•</span>
                  <span className={`px-2 py-0.5 rounded-full ${
                    article?.difficulty === 'Débutant' ?'bg-success/10 text-success'
                      : article?.difficulty === 'Intermédiaire' ?'bg-warning/10 text-warning' :'bg-error/10 text-error'
                  }`}>
                    {article?.difficulty}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          iconName="X"
          onClick={onClose}
          aria-label="Fermer l'aperçu"
        />
      </div>
      {/* Preview Image */}
      {article?.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <Image
            src={article?.image}
            alt={article?.title}
            className="w-full h-32 object-cover"
          />
        </div>
      )}
      {/* Content Preview */}
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {article?.excerpt}
        </p>

        {/* Key Points */}
        {article?.keyPoints && article?.keyPoints?.length > 0 && (
          <div>
            <h4 className="text-sm font-body font-body-medium text-foreground mb-2">
              Points clés :
            </h4>
            <ul className="space-y-1">
              {article?.keyPoints?.slice(0, 3)?.map((point, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
              {article?.keyPoints?.length > 3 && (
                <li className="text-xs text-muted-foreground ml-6">
                  +{article?.keyPoints?.length - 3} autres points...
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Related Topics */}
        {article?.relatedTopics && article?.relatedTopics?.length > 0 && (
          <div>
            <h4 className="text-sm font-body font-body-medium text-foreground mb-2">
              Sujets connexes :
            </h4>
            <div className="flex flex-wrap gap-2">
              {article?.relatedTopics?.slice(0, 4)?.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{article?.views || 0} vues</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="ThumbsUp" size={14} />
              <span>{article?.likes || 0} utiles</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
              onClick={() => onViewFull(article)}
            >
              Lire l'article
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBasePreview;