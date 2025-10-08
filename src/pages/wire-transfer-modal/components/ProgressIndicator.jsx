import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { number: 1, title: 'Détails', description: 'Informations du virement' },
    { number: 2, title: 'Vérification', description: 'Confirmation des données' },
    { number: 3, title: 'Traitement', description: 'Exécution du virement' }
  ];

  return (
    <div className="px-6 py-4 bg-muted/20 border-b border-border">
      <div className="flex items-center justify-between">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.number}>
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-body font-body-semibold transition-all duration-300 ${
                step?.number < currentStep 
                  ? 'bg-success text-success-foreground' 
                  : step?.number === currentStep
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {step?.number < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  step?.number
                )}
              </div>
              <div className="hidden sm:block">
                <p className={`text-sm font-body font-body-medium ${
                  step?.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step?.description}
                </p>
              </div>
            </div>
            
            {index < steps?.length - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-0.5 transition-all duration-300 ${
                  step?.number < currentStep ? 'bg-success' : 'bg-muted'
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Mobile Step Indicator */}
      <div className="sm:hidden mt-3 text-center">
        <p className="text-sm font-body font-body-medium text-foreground">
          {steps?.[currentStep - 1]?.title}
        </p>
        <p className="text-xs text-muted-foreground">
          Étape {currentStep} sur {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;