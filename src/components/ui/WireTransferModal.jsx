import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';

const WireTransferModal = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  const [undoTimer, setUndoTimer] = useState(5);
  const [formData, setFormData] = useState({
    amount: '',
    iban: '',
    beneficiaryName: '',
    reference: '',
    executionDate: new Date()?.toISOString()?.split('T')?.[0]
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (showUndo && undoTimer > 0) {
      const timer = setTimeout(() => {
        setUndoTimer(undoTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (showUndo && undoTimer === 0) {
      handleFinalSubmit();
    }
  }, [showUndo, undoTimer]);

  const validateIBAN = (iban) => {
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}([A-Z0-9]?){0,16}$/;
    return ibanRegex?.test(iban?.replace(/\s/g, ''));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.amount || parseFloat(formData?.amount) <= 0) {
      newErrors.amount = 'Veuillez saisir un montant valide';
    }

    if (!formData?.iban) {
      newErrors.iban = 'L\'IBAN est requis';
    } else if (!validateIBAN(formData?.iban)) {
      newErrors.iban = 'Format IBAN invalide';
    }

    if (!formData?.beneficiaryName?.trim()) {
      newErrors.beneficiaryName = 'Le nom du bénéficiaire est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setStep(3);
    setShowUndo(true);
    setUndoTimer(5);
  };

  const handleUndo = () => {
    setShowUndo(false);
    setStep(1);
    setUndoTimer(5);
  };

  const handleFinalSubmit = () => {
    onComplete(formData);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setShowUndo(false);
    setUndoTimer(5);
    setFormData({
      amount: '',
      iban: '',
      beneficiaryName: '',
      reference: '',
      executionDate: new Date()?.toISOString()?.split('T')?.[0]
    });
    setErrors({});
    onClose();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    })?.format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={!showUndo ? handleClose : undefined}
      />
      {/* Modal */}
      <div className="relative w-full max-w-md bg-surface rounded-2xl shadow-custom-xl border border-border overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-heading font-heading-semibold text-foreground">
              Virement bancaire
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {step === 1 && 'Saisissez les détails du virement'}
              {step === 2 && 'Vérifiez les informations'}
              {step === 3 && 'Virement en cours de traitement'}
            </p>
          </div>
          {!showUndo && (
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={handleClose}
              aria-label="Fermer"
            />
          )}
        </div>

        {/* Progress Indicator */}
        <div className="px-6 py-4 bg-muted/30">
          <div className="flex items-center space-x-2">
            {[1, 2, 3]?.map((stepNumber) => (
              <React.Fragment key={stepNumber}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-body font-body-medium transition-colors duration-200 ${
                  stepNumber <= step 
                    ? 'bg-accent text-accent-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {stepNumber < step ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 3 && (
                  <div className={`flex-1 h-0.5 transition-colors duration-200 ${
                    stepNumber < step ? 'bg-accent' : 'bg-muted'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <div className="space-y-4">
              <Input
                label="Montant"
                type="number"
                placeholder="0.00"
                value={formData?.amount}
                onChange={(e) => handleInputChange('amount', e?.target?.value)}
                error={errors?.amount}
                required
                className="font-data"
              />

              <Input
                label="IBAN du bénéficiaire"
                type="text"
                placeholder="FR76 1234 5678 9012 3456 7890 123"
                value={formData?.iban}
                onChange={(e) => handleInputChange('iban', e?.target?.value?.toUpperCase())}
                error={errors?.iban}
                required
                className="font-data"
              />

              <Input
                label="Nom du bénéficiaire"
                type="text"
                placeholder="Nom complet"
                value={formData?.beneficiaryName}
                onChange={(e) => handleInputChange('beneficiaryName', e?.target?.value)}
                error={errors?.beneficiaryName}
                required
              />

              <Input
                label="Référence (optionnel)"
                type="text"
                placeholder="Motif du virement"
                value={formData?.reference}
                onChange={(e) => handleInputChange('reference', e?.target?.value)}
              />

              <Input
                label="Date d'exécution"
                type="date"
                value={formData?.executionDate}
                onChange={(e) => handleInputChange('executionDate', e?.target?.value)}
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Montant</span>
                  <span className="font-data font-data-medium text-lg text-foreground">
                    {formatCurrency(parseFloat(formData?.amount))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Bénéficiaire</span>
                  <span className="font-body font-body-medium text-foreground">
                    {formData?.beneficiaryName}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">IBAN</span>
                  <span className="font-data text-sm text-foreground">
                    {formData?.iban}
                  </span>
                </div>
                {formData?.reference && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Référence</span>
                    <span className="text-sm text-foreground">{formData?.reference}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Date d'exécution</span>
                  <span className="text-sm text-foreground">
                    {new Date(formData.executionDate)?.toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>

              <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm font-body font-body-medium text-foreground">
                      Vérifiez attentivement
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Les virements ne peuvent pas être annulés une fois confirmés.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-4">
              {showUndo ? (
                <>
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Clock" size={32} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-heading-semibold text-foreground">
                      Virement programmé
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Votre virement sera traité le {new Date(formData.executionDate)?.toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="bg-accent/10 border border-accent/20 rounded-xl p-4">
                    <p className="text-sm font-body font-body-medium text-foreground mb-2">
                      Vous pouvez encore annuler
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Annulation automatique dans {undoTimer} secondes
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUndo}
                      iconName="Undo"
                      iconPosition="left"
                      fullWidth
                    >
                      Annuler le virement
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="CheckCircle" size={32} className="text-success" />
                  </div>
                  <div>
                    <h3 className="text-lg font-heading font-heading-semibold text-foreground">
                      Virement confirmé
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Votre virement de {formatCurrency(parseFloat(formData?.amount))} a été programmé
                    </p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!showUndo && (
          <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
            {step === 1 && (
              <>
                <Button variant="ghost" onClick={handleClose}>
                  Annuler
                </Button>
                <Button onClick={handleNext} iconName="ArrowRight" iconPosition="right">
                  Continuer
                </Button>
              </>
            )}
            
            {step === 2 && (
              <>
                <Button variant="ghost" onClick={() => setStep(1)}>
                  Retour
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  loading={isLoading}
                  iconName="Send" 
                  iconPosition="right"
                >
                  Confirmer le virement
                </Button>
              </>
            )}

            {step === 3 && !showUndo && (
              <Button onClick={handleClose} fullWidth>
                Fermer
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WireTransferModal;