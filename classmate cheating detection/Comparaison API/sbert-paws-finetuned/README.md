---
tags:
- sentence-transformers
- sentence-similarity
- feature-extraction
- generated_from_trainer
- dataset_size:49401
- loss:CosineSimilarityLoss
base_model: sentence-transformers/all-MiniLM-L6-v2
widget:
- source_sentence: He was a member of the Bapounou people , was born in Moussambou
    and trained in local Catholic schools , then at the secondary school of Lambaréné
    , public .
  sentences:
  - The Major A Premiership is currently held in the Pacific League by the Pine Hills
    Lightning in the Major League and Runcorn Indians .
  - He has also directed many commercials , including the European `` Freestyle ''
    campaign for Nike , which won several international advertising awards and music
    videos .
  - A member of the Bapounou people , he was born at Moussambou and educated in local
    Catholic schools , then at the public secondary school of Lambaréné .
- source_sentence: After studying in Belfast he sailed out to Shanghai to join his
    parents in 1933 .
  sentences:
  - They not only measure population numbers , but also measure demographic parameters
    . This combination technique consists of camera traps and sufficient tiger search
    to collect basic data .
  - After studying in Shanghai , he sailed to Belfast in 1933 in order to join his
    parents .
  - He also appeared in 53 games for the Greensboro Patriots ( Piedmont League ) with
    a 26 - 19 record over the course of the seasons 1928 and 1929 .
- source_sentence: He lived in San Antonio for twenty years , returning to New York
    City in May 2005 .
  sentences:
  - He lived in New York City for twenty years and returned in May 2005 to San Antonio
    .
  - Mhasad is a village in Dahanu - district of Maharashtra , India . It is located
    in the Palghar Taluka .
  - We consider differential operators here as a generalization of pseudo-differential
    operators .
- source_sentence: Ravi Singh was born in Delhi , India to Mr. Puran Singh and Smt
    .
  sentences:
  - Castlebrae Community High School is a secondary school located in the area of
    Greendykes in Edinburgh .
  - Mr. Ravi Singh was born in Delhi , India , around Puran Singh and Smt .
  - 'Total population : 333 of which were 49.8 % male and 50.2 % female .'
- source_sentence: The Discovery Centre visitor attraction includes the Turret house
    , Tudor grounds , Sheffield Manor Lodge , Manor Oaks Farm , Manor Cottages and
    Rhubarb Shed Cafe .
  sentences:
  - The Sheffield Manor Lodge visitor attraction includes the Turret House , Tudor
    Reasons , Discovery Centre , Manor Oaks Farm , Manor Cottages and Rhubarb Shed
    Cafe .
  - Examples of ceramics include white porcelain or white porcelain , which is decorated
    with cobalt , copper red underglaze , blue underglaze and iron underglaze .
  - Ted Turner , the son of Robert Edward Turner , inherited the company when the
    elder Turner died in 1963 .
pipeline_tag: sentence-similarity
library_name: sentence-transformers
---

# SentenceTransformer based on sentence-transformers/all-MiniLM-L6-v2

This is a [sentence-transformers](https://www.SBERT.net) model finetuned from [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2). It maps sentences & paragraphs to a 384-dimensional dense vector space and can be used for semantic textual similarity, semantic search, paraphrase mining, text classification, clustering, and more.

## Model Details

### Model Description
- **Model Type:** Sentence Transformer
- **Base model:** [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) <!-- at revision c9745ed1d9f207416be6d2e6f8de32d1f16199bf -->
- **Maximum Sequence Length:** 256 tokens
- **Output Dimensionality:** 384 dimensions
- **Similarity Function:** Cosine Similarity
<!-- - **Training Dataset:** Unknown -->
<!-- - **Language:** Unknown -->
<!-- - **License:** Unknown -->

### Model Sources

- **Documentation:** [Sentence Transformers Documentation](https://sbert.net)
- **Repository:** [Sentence Transformers on GitHub](https://github.com/UKPLab/sentence-transformers)
- **Hugging Face:** [Sentence Transformers on Hugging Face](https://huggingface.co/models?library=sentence-transformers)

### Full Model Architecture

```
SentenceTransformer(
  (0): Transformer({'max_seq_length': 256, 'do_lower_case': False}) with Transformer model: BertModel 
  (1): Pooling({'word_embedding_dimension': 384, 'pooling_mode_cls_token': False, 'pooling_mode_mean_tokens': True, 'pooling_mode_max_tokens': False, 'pooling_mode_mean_sqrt_len_tokens': False, 'pooling_mode_weightedmean_tokens': False, 'pooling_mode_lasttoken': False, 'include_prompt': True})
  (2): Normalize()
)
```

## Usage

### Direct Usage (Sentence Transformers)

First install the Sentence Transformers library:

```bash
pip install -U sentence-transformers
```

Then you can load this model and run inference.
```python
from sentence_transformers import SentenceTransformer

# Download from the 🤗 Hub
model = SentenceTransformer("sentence_transformers_model_id")
# Run inference
sentences = [
    'The Discovery Centre visitor attraction includes the Turret house , Tudor grounds , Sheffield Manor Lodge , Manor Oaks Farm , Manor Cottages and Rhubarb Shed Cafe .',
    'The Sheffield Manor Lodge visitor attraction includes the Turret House , Tudor Reasons , Discovery Centre , Manor Oaks Farm , Manor Cottages and Rhubarb Shed Cafe .',
    'Ted Turner , the son of Robert Edward Turner , inherited the company when the elder Turner died in 1963 .',
]
embeddings = model.encode(sentences)
print(embeddings.shape)
# [3, 384]

# Get the similarity scores for the embeddings
similarities = model.similarity(embeddings, embeddings)
print(similarities.shape)
# [3, 3]
```

<!--
### Direct Usage (Transformers)

<details><summary>Click to see the direct usage in Transformers</summary>

</details>
-->

<!--
### Downstream Usage (Sentence Transformers)

You can finetune this model on your own dataset.

<details><summary>Click to expand</summary>

</details>
-->

<!--
### Out-of-Scope Use

*List how the model may foreseeably be misused and address what users ought not to do with the model.*
-->

<!--
## Bias, Risks and Limitations

*What are the known or foreseeable issues stemming from this model? You could also flag here known failure cases or weaknesses of the model.*
-->

<!--
### Recommendations

*What are recommendations with respect to the foreseeable issues? For example, filtering explicit content.*
-->

## Training Details

### Training Dataset

#### Unnamed Dataset

* Size: 49,401 training samples
* Columns: <code>sentence_0</code>, <code>sentence_1</code>, and <code>label</code>
* Approximate statistics based on the first 1000 samples:
  |         | sentence_0                                                                        | sentence_1                                                                         | label                                                          |
  |:--------|:----------------------------------------------------------------------------------|:-----------------------------------------------------------------------------------|:---------------------------------------------------------------|
  | type    | string                                                                            | string                                                                             | float                                                          |
  | details | <ul><li>min: 9 tokens</li><li>mean: 26.91 tokens</li><li>max: 49 tokens</li></ul> | <ul><li>min: 10 tokens</li><li>mean: 26.93 tokens</li><li>max: 49 tokens</li></ul> | <ul><li>min: 0.0</li><li>mean: 0.41</li><li>max: 1.0</li></ul> |
* Samples:
  | sentence_0                                                                                                                                        | sentence_1                                                                                                                                       | label            |
  |:--------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|
  | <code>Matt Skelton faced WBA Heavyweight Champion Ruslan Chagaev on 19 January 2008 in Düsseldorf .</code>                                        | <code>On January 19 , 2008 , Matt Skelton met WBA - Heavyweight - Champion Ruslan Chagaev in Düsseldorf .</code>                                 | <code>1.0</code> |
  | <code>Ippolita Rostagno was born on December 10 , 1963 in Florence and is the daughter of an Italian artist and an American intellectual .</code> | <code>Born December 10 , 1963 in Florence , Italy , Ippolita Rostagno is the daughter of an Italian artist and an American intellectual .</code> | <code>1.0</code> |
  | <code>Small populations have also been found in western Illinois and eastern Oklahoma .</code>                                                    | <code>Small populations have also been found in the western Illinois and eastern Oklahoma .</code>                                               | <code>1.0</code> |
* Loss: [<code>CosineSimilarityLoss</code>](https://sbert.net/docs/package_reference/sentence_transformer/losses.html#cosinesimilarityloss) with these parameters:
  ```json
  {
      "loss_fct": "torch.nn.modules.loss.MSELoss"
  }
  ```

### Training Hyperparameters
#### Non-Default Hyperparameters

- `per_device_train_batch_size`: 32
- `per_device_eval_batch_size`: 32
- `num_train_epochs`: 30
- `multi_dataset_batch_sampler`: round_robin

#### All Hyperparameters
<details><summary>Click to expand</summary>

- `overwrite_output_dir`: False
- `do_predict`: False
- `eval_strategy`: no
- `prediction_loss_only`: True
- `per_device_train_batch_size`: 32
- `per_device_eval_batch_size`: 32
- `per_gpu_train_batch_size`: None
- `per_gpu_eval_batch_size`: None
- `gradient_accumulation_steps`: 1
- `eval_accumulation_steps`: None
- `torch_empty_cache_steps`: None
- `learning_rate`: 5e-05
- `weight_decay`: 0.0
- `adam_beta1`: 0.9
- `adam_beta2`: 0.999
- `adam_epsilon`: 1e-08
- `max_grad_norm`: 1
- `num_train_epochs`: 30
- `max_steps`: -1
- `lr_scheduler_type`: linear
- `lr_scheduler_kwargs`: {}
- `warmup_ratio`: 0.0
- `warmup_steps`: 0
- `log_level`: passive
- `log_level_replica`: warning
- `log_on_each_node`: True
- `logging_nan_inf_filter`: True
- `save_safetensors`: True
- `save_on_each_node`: False
- `save_only_model`: False
- `restore_callback_states_from_checkpoint`: False
- `no_cuda`: False
- `use_cpu`: False
- `use_mps_device`: False
- `seed`: 42
- `data_seed`: None
- `jit_mode_eval`: False
- `use_ipex`: False
- `bf16`: False
- `fp16`: False
- `fp16_opt_level`: O1
- `half_precision_backend`: auto
- `bf16_full_eval`: False
- `fp16_full_eval`: False
- `tf32`: None
- `local_rank`: 0
- `ddp_backend`: None
- `tpu_num_cores`: None
- `tpu_metrics_debug`: False
- `debug`: []
- `dataloader_drop_last`: False
- `dataloader_num_workers`: 0
- `dataloader_prefetch_factor`: None
- `past_index`: -1
- `disable_tqdm`: False
- `remove_unused_columns`: True
- `label_names`: None
- `load_best_model_at_end`: False
- `ignore_data_skip`: False
- `fsdp`: []
- `fsdp_min_num_params`: 0
- `fsdp_config`: {'min_num_params': 0, 'xla': False, 'xla_fsdp_v2': False, 'xla_fsdp_grad_ckpt': False}
- `tp_size`: 0
- `fsdp_transformer_layer_cls_to_wrap`: None
- `accelerator_config`: {'split_batches': False, 'dispatch_batches': None, 'even_batches': True, 'use_seedable_sampler': True, 'non_blocking': False, 'gradient_accumulation_kwargs': None}
- `deepspeed`: None
- `label_smoothing_factor`: 0.0
- `optim`: adamw_torch
- `optim_args`: None
- `adafactor`: False
- `group_by_length`: False
- `length_column_name`: length
- `ddp_find_unused_parameters`: None
- `ddp_bucket_cap_mb`: None
- `ddp_broadcast_buffers`: False
- `dataloader_pin_memory`: True
- `dataloader_persistent_workers`: False
- `skip_memory_metrics`: True
- `use_legacy_prediction_loop`: False
- `push_to_hub`: False
- `resume_from_checkpoint`: None
- `hub_model_id`: None
- `hub_strategy`: every_save
- `hub_private_repo`: None
- `hub_always_push`: False
- `gradient_checkpointing`: False
- `gradient_checkpointing_kwargs`: None
- `include_inputs_for_metrics`: False
- `include_for_metrics`: []
- `eval_do_concat_batches`: True
- `fp16_backend`: auto
- `push_to_hub_model_id`: None
- `push_to_hub_organization`: None
- `mp_parameters`: 
- `auto_find_batch_size`: False
- `full_determinism`: False
- `torchdynamo`: None
- `ray_scope`: last
- `ddp_timeout`: 1800
- `torch_compile`: False
- `torch_compile_backend`: None
- `torch_compile_mode`: None
- `include_tokens_per_second`: False
- `include_num_input_tokens_seen`: False
- `neftune_noise_alpha`: None
- `optim_target_modules`: None
- `batch_eval_metrics`: False
- `eval_on_start`: False
- `use_liger_kernel`: False
- `eval_use_gather_object`: False
- `average_tokens_across_devices`: False
- `prompts`: None
- `batch_sampler`: batch_sampler
- `multi_dataset_batch_sampler`: round_robin

</details>

### Training Logs
| Epoch   | Step  | Training Loss |
|:-------:|:-----:|:-------------:|
| 0.3238  | 500   | 0.2528        |
| 0.6477  | 1000  | 0.2008        |
| 0.9715  | 1500  | 0.1845        |
| 1.2953  | 2000  | 0.1657        |
| 1.6192  | 2500  | 0.1585        |
| 1.9430  | 3000  | 0.149         |
| 2.2668  | 3500  | 0.1354        |
| 2.5907  | 4000  | 0.13          |
| 2.9145  | 4500  | 0.1261        |
| 3.2383  | 5000  | 0.1152        |
| 3.5622  | 5500  | 0.107         |
| 3.8860  | 6000  | 0.1079        |
| 4.2098  | 6500  | 0.099         |
| 4.5337  | 7000  | 0.0941        |
| 4.8575  | 7500  | 0.0938        |
| 5.1813  | 8000  | 0.0878        |
| 5.5052  | 8500  | 0.0838        |
| 5.8290  | 9000  | 0.0812        |
| 6.1528  | 9500  | 0.0777        |
| 6.4767  | 10000 | 0.0748        |
| 6.8005  | 10500 | 0.0716        |
| 7.1244  | 11000 | 0.0733        |
| 7.4482  | 11500 | 0.0672        |
| 7.7720  | 12000 | 0.067         |
| 8.0959  | 12500 | 0.0628        |
| 8.4197  | 13000 | 0.0613        |
| 8.7435  | 13500 | 0.0602        |
| 9.0674  | 14000 | 0.0594        |
| 9.3912  | 14500 | 0.0553        |
| 9.7150  | 15000 | 0.0558        |
| 10.0389 | 15500 | 0.0544        |
| 10.3627 | 16000 | 0.0511        |
| 10.6865 | 16500 | 0.0516        |
| 11.0104 | 17000 | 0.0523        |
| 11.3342 | 17500 | 0.0474        |
| 11.6580 | 18000 | 0.0476        |
| 11.9819 | 18500 | 0.0472        |
| 12.3057 | 19000 | 0.0439        |
| 12.6295 | 19500 | 0.0438        |
| 12.9534 | 20000 | 0.0435        |
| 13.2772 | 20500 | 0.0412        |
| 13.6010 | 21000 | 0.0419        |
| 13.9249 | 21500 | 0.0421        |
| 14.2487 | 22000 | 0.0377        |
| 14.5725 | 22500 | 0.0378        |
| 14.8964 | 23000 | 0.0414        |
| 15.2202 | 23500 | 0.0383        |
| 15.5440 | 24000 | 0.0368        |
| 15.8679 | 24500 | 0.0376        |
| 16.1917 | 25000 | 0.0344        |
| 16.5155 | 25500 | 0.0357        |
| 16.8394 | 26000 | 0.0354        |
| 17.1632 | 26500 | 0.0354        |
| 17.4870 | 27000 | 0.0325        |
| 17.8109 | 27500 | 0.0332        |
| 18.1347 | 28000 | 0.0326        |
| 18.4585 | 28500 | 0.031         |
| 18.7824 | 29000 | 0.0322        |
| 19.1062 | 29500 | 0.0315        |
| 19.4301 | 30000 | 0.031         |
| 19.7539 | 30500 | 0.0303        |
| 20.0777 | 31000 | 0.0302        |
| 20.4016 | 31500 | 0.0286        |
| 20.7254 | 32000 | 0.0294        |
| 21.0492 | 32500 | 0.0312        |
| 21.3731 | 33000 | 0.0277        |
| 21.6969 | 33500 | 0.0298        |
| 22.0207 | 34000 | 0.0285        |
| 22.3446 | 34500 | 0.0279        |
| 22.6684 | 35000 | 0.0283        |
| 22.9922 | 35500 | 0.0258        |
| 23.3161 | 36000 | 0.0259        |
| 23.6399 | 36500 | 0.027         |
| 23.9637 | 37000 | 0.0259        |
| 24.2876 | 37500 | 0.0253        |
| 24.6114 | 38000 | 0.0261        |
| 24.9352 | 38500 | 0.0268        |
| 25.2591 | 39000 | 0.0252        |
| 25.5829 | 39500 | 0.0248        |
| 25.9067 | 40000 | 0.0253        |
| 26.2306 | 40500 | 0.0237        |
| 26.5544 | 41000 | 0.0263        |
| 26.8782 | 41500 | 0.0246        |
| 27.2021 | 42000 | 0.0244        |
| 27.5259 | 42500 | 0.0235        |
| 27.8497 | 43000 | 0.0242        |
| 28.1736 | 43500 | 0.0249        |
| 28.4974 | 44000 | 0.0233        |
| 28.8212 | 44500 | 0.0232        |
| 29.1451 | 45000 | 0.0243        |
| 29.4689 | 45500 | 0.024         |
| 29.7927 | 46000 | 0.0233        |


### Framework Versions
- Python: 3.11.12
- Sentence Transformers: 4.1.0
- Transformers: 4.51.3
- PyTorch: 2.6.0+cu124
- Accelerate: 1.6.0
- Datasets: 3.6.0
- Tokenizers: 0.21.1

## Citation

### BibTeX

#### Sentence Transformers
```bibtex
@inproceedings{reimers-2019-sentence-bert,
    title = "Sentence-BERT: Sentence Embeddings using Siamese BERT-Networks",
    author = "Reimers, Nils and Gurevych, Iryna",
    booktitle = "Proceedings of the 2019 Conference on Empirical Methods in Natural Language Processing",
    month = "11",
    year = "2019",
    publisher = "Association for Computational Linguistics",
    url = "https://arxiv.org/abs/1908.10084",
}
```

<!--
## Glossary

*Clearly define terms in order to be accessible across audiences.*
-->

<!--
## Model Card Authors

*Lists the people who create the model card, providing recognition and accountability for the detailed work that goes into its construction.*
-->

<!--
## Model Card Contact

*Provides a way for people who have updates to the Model Card, suggestions, or questions, to contact the Model Card authors.*
-->